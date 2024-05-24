import json
from uuid import UUID
import logging
from threading import Timer

from asgiref.sync import async_to_sync
from django.contrib.auth import get_user_model
from channels.generic.websocket import JsonWebsocketConsumer
from src.games.models import Game, Interaction, Choice
from src.users.serializers import PlayerSerializer
from src.games.utils import determine_winner

User = get_user_model()

logger = logging.getLogger(__name__)

class UUIDEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, UUID):
            return obj.hex
        return json.JSONEncoder.default(self, obj)

class GameConsumer(JsonWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.user = None
        self.game = None
        self.game_id = None
        self.countdown_timer = None
        self.play_timeout_timer = None

    def connect(self):
        self.initialize_user()
        self.accept()
        self.initialize_game()

        logger.debug(f"User {self.user.username} connecting to game {self.game_id}")

        async_to_sync(self.channel_layer.group_add)(
            self.game_id,
            self.channel_name,
        )
        self.broadcast_interactions()

    def disconnect(self, code):
        self.handle_user_disconnect()
        async_to_sync(self.channel_layer.group_discard)(
            self.game_id,
            self.channel_name,
        )
        self.stop_play_timeout()
        return super().disconnect(code)

    def receive_json(self, content, **kwargs):
        message_type = content["type"]
        logger.debug(f"Received message: {content} from user {self.user.username}")

        if message_type == "choose":
            self.process_choice(content["choice"])
        elif message_type == "join":
            self.handle_user_join()
        elif message_type == "reset":
            self.reset_game()
        elif message_type == "start":
            self.start_play_timeout()

        return super().receive_json(content, **kwargs)

    def initialize_user(self):
        self.user = self.scope["user"]

    def initialize_game(self):
        self.game_id = self.scope['url_route']['kwargs']['game_id']
        self.game, created = Game.objects.get_or_create(id=self.game_id)

    def process_choice(self, choice_value):
        choice, created = Choice.objects.get_or_create(game=self.game, player=self.user, defaults={"choice": choice_value})
        if not created:
            self.notify_lobby(custom_message="Wait for your opponent to play")
        else:
            self.evaluate_game_outcome()

    def handle_user_join(self):
        self.game.connect(self.user)
        self.broadcast_interactions()
        self.notify_lobby("joined")

    def handle_user_disconnect(self):
        self.game.disconnect(user=self.user)
        self.broadcast_interactions(set_status=False)
        self.notify_lobby("left")

    def broadcast_interactions(self, set_status=True):
        if set_status:
            self.set_player_status("connected")

        players_data = [
            {**PlayerSerializer(interaction.player).data, **{"status": interaction.status}}
            for interaction in Interaction.objects.filter(game=self.game)
        ]
        self.send_to_lobby(
            {
                "type": "update_players",
                "players": players_data,
            },
        )

    def set_player_status(self, status):
        player_interaction = Interaction.objects.filter(player=self.user).first()
        if player_interaction:
            player_interaction.set_status(status)

    def evaluate_game_outcome(self):
        if self.game.both_played():
            game_result = determine_winner(self.game)
            if isinstance(game_result, str):
                self.notify_lobby(custom_message=f"Game is {game_result}")
            elif isinstance(game_result, User):
                self.notify_lobby(custom_message=f"Winner is {game_result}")
                self.display_game_choices()
            self.stop_play_timeout()

    def display_game_choices(self):
        choices_data = [
            {"player": choice.player.username, "choice": choice.choice} for choice in Choice.objects.filter(game=self.game)
        ]
        self.send_to_lobby(
            {
                "type": "display_choices",
                "choices": choices_data,
            },
        )

    def notify_lobby(self, type="joined", custom_message=None):
        self.send_to_lobby(
            {
                "type": "game_notification",
                "message": f"{self.user.username} has {type} the lobby." if not custom_message else custom_message,
            },
        )

    def send_to_lobby(self, data):
        logger.debug(f"Sending data to lobby: {data['type']}")
        async_to_sync(self.channel_layer.group_send)(self.game_id, {"type": "broadcast", "data": data})

    @classmethod
    def encode_json(cls, content):
        return json.dumps(content, cls=UUIDEncoder)

    def broadcast(self, event):
        data = event['data']
        self.send_json(data)

    def start_play_timeout(self, timeout_seconds=10):
        self.stop_play_timeout()
        self.play_timeout_timer = Timer(timeout_seconds, self.evaluate_game_outcome)
        self.play_timeout_timer.start()
        self.notify_lobby(custom_message=f"Player turn timeout set for {timeout_seconds} seconds")

    def stop_play_timeout(self):
        if self.play_timeout_timer:
            self.play_timeout_timer.cancel()

    def reset_game(self):
        Choice.objects.filter(game=self.game).delete()
        Interaction.objects.filter(game=self.game).update(status='disconnected')
        self.broadcast_interactions()
        self.notify_lobby(custom_message="Game has been reset")
        self.start_play_timeout()
