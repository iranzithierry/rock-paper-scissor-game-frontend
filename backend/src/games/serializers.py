from rest_framework import serializers
from .models import Game, Player
from src.users.serializers import PlayerSerializer
class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = (
            'id',
            'mode',
            'status',
            'timestamp',
        )
    def to_representation(self, instance: Game):
        representation = super().to_representation(instance)
        players = [
            {
                "player": player.player.username,
            } for player in Player.objects.filter(game=instance)
        ]
        representation["players"] = players
        return representation