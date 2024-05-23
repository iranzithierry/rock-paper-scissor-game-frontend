import json
from uuid import UUID

from asgiref.sync import async_to_sync
from django.contrib.auth import get_user_model
from channels.generic.websocket import JsonWebsocketConsumer
from src.games.models import Game, Player, Choice
from src.users.serializers import PlayerSerializer
from src.games.utils import determine_winner

User = get_user_model()


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

    def connect(self):
        self.user = self.scope["user"]
        if not self.user.is_authenticated:
            return

        self.accept()
        self.game_id = self.scope['url_route']['kwargs']['game_id']
        self.game, created = Game.objects.get_or_create(id=self.game_id)

        async_to_sync(self.channel_layer.group_add)(
            self.game_id,
            self.channel_name,
        )
        self.update_players()

    def disconnect(self, code):
        if self.user.is_authenticated:
            self.handle_leave_game()

        async_to_sync(self.channel_layer.group_discard)(
            self.game_id,
            self.channel_name,
        )
        return super().disconnect(code)

    def receive_json(self, content, **kwargs):
        message_type = content["type"]
        if message_type == "make_choice":
           self.handle_make_choice(content["choice"])
        elif message_type == "join_game":
             self.handle_join_game()

        return super().receive_json(content, **kwargs)

    def handle_make_choice(self, choice):
        choice, created = Choice.objects.get_or_create(game=self.game, player=self.user, defaults={"choice": choice})
        if not created:
           self.notify_users(custom="You can't play before your opponent play")
        else:
            game_decision = determine_winner(self.game)
            if isinstance(game_decision, str):
               self.notify_users(custom=f"Game is {game_decision}")
            if isinstance(game_decision, User):
               self.notify_users(custom=f"Winner is {game_decision}")
               self.preview_game_choices()

    def handle_join_game(self):
        self.game.join(self.user)
        self.update_players()
        self.notify_users("joined")

    def handle_leave_game(self):
        self.game.leave(user=self.user)
        self.update_players(setStatus=False)
        self.notify_users("left")

    def update_players(self, setStatus = True):
        if setStatus:
            player = Player.objects.filter(player=self.user).first()
            if player:
                player.set_status('online')

        players = [
            {
                **PlayerSerializer(player.player).data, 
                **{"status": player.status}
            } for player in Player.objects.filter(game=self.game)
        ]
        self.send_to_lobby(
            {
                "type": "update_uplayers",
                "players": players,
            },
        )
    def preview_game_choices(self):
        choices = [
            {"player": choice.player.username, "choice": choice.choice, "timestamp": choice.timestamp.isoformat()}
            for choice in Choice.objects.filter(game=self.game)
        ]
        self.send_to_lobby(
            {
                "type": "preview_choices",
                "choices": choices,
            },
        )


    def notify_users(self, type = "joined", custom=None):
        self.send_to_lobby(
            {
                "type": "game_notification",
                "message": f"{self.user.username} has {type} the lobby." if not custom else custom,
            },
        )

    def send_to_lobby(self, data):
        async_to_sync(self.channel_layer.group_send)(self.game_id, data)

    def update_uplayers(self, event):
        self.send_json(event)
    
    def preview_choices(self, event):
        self.send_json(event)

    def game_notification(self, event):
        self.send_json(event)

    @classmethod
    def encode_json(cls, content):
        return json.dumps(content, cls=UUIDEncoder)
