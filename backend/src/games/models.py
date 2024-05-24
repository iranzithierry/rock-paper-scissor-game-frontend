import uuid
from django.db import models
from src.users.models import User

class Game(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    mode = models.CharField(max_length=100, default='Public', null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def is_full(self):
        return self.interactions.count() == 2
    
    def both_disconnected(self):
        return self.interactions.filter(status='disconnected').count() == 2
    
    def status(self):
        return "Full" if self.is_full() else "Open"

    def both_played(self):
        return self.is_full() and self.choices.count() == 2

    def connect(self, user: User):
        if not self.is_full():
            player, created = Interaction.objects.get_or_create(game=self, player=user)
            player.status = 'connected'
            player.save()

    def disconnect(self, user: User):
        player = self.interactions.filter(player=user).first()
        if player:
            player.status = 'disconnected'
            player.save()

    class Meta:
        db_table = "games"


class Interaction(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='interactions')
    player = models.ForeignKey(User, on_delete=models.CASCADE, related_name='interactions')
    status = models.CharField(max_length=40, default='disconnected')
    timestamp = models.DateTimeField(auto_now_add=True)

    def set_status(self, status):
        self.status = status
        self.save()

    class Meta:
        db_table = "game_interactions"


class Choice(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='choices')
    player = models.ForeignKey(User, on_delete=models.CASCADE)
    choice = models.CharField(max_length=10)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "game_choices"


