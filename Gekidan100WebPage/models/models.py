from django.db import models

# Create your models here.


class VideoTicket(models.Model):
    mail_address = models.CharField(max_length=256)
    payment_id = models.CharField(max_length=256)
    payer_id = models.CharField(max_length=256)
    token = models.CharField(max_length=256)
    payment_id_hash = models.CharField(max_length=70)
    payer_id_hash = models.CharField(max_length=70)
    token_hash = models.CharField(max_length=70)

class Idea(models.Model):
    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=256)
    author = models.CharField(max_length=256)

class IdeaContents(models.Model):
    name = models.CharField(max_length=256)
    value = models.CharField(max_length=256)
    idea_id = models.ForeignKey(Idea, on_delete=models.CASCADE)

