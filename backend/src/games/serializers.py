from rest_framework import serializers
from .models import Game, Interaction

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
                "player": interaction.player.username,
            } for interaction in Interaction.objects.filter(game=instance)
        ]
        representation["players"] = players
        return representation