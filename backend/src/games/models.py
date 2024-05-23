import uuid
from django.contrib.auth import get_user_model
from django.db import models
from src.users.models import User

class Game(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    mode = models.CharField(max_length=100, default='Public', null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def is_full(self):
        return self.players.count() == 2
    
    def status(self):
        return "Full" if self.is_full() else "Open"

    def both_played(self):
        return self.is_full() and self.choices.count() == 2
    
    def get_online_count(self):
        return self.players.filter(status='online').count()

    def join(self, user):
        if not self.is_full():
            player, created = Player.objects.get_or_create(game=self, player=user)
            player.status = 'online'
            player.save()

    def leave(self, user):
        player = self.players.filter(player=user).first()
        if player:
            player.status = 'offline'
            player.save()

    def __str__(self):
        return f"{self.name} ({self.get_online_count()}/{self.max_players})"


class Player(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='players')
    player = models.ForeignKey(User, on_delete=models.CASCADE, related_name='players')
    status = models.CharField(max_length=10, default='offline')
    timestamp = models.DateTimeField(auto_now_add=True)

    def set_status(self, status):
        self.status = status
        self.save()

    def __str__(self):
        return f"{self.player.username} in game {self.game.name}"


class Choice(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='choices')
    player = models.ForeignKey(User, on_delete=models.CASCADE, related_name='choices')
    choice = models.CharField(max_length=10)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.player.username} chose {self.choice} in game {self.game.name}"


