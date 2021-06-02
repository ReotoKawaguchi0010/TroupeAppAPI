from django.db import models

class Schedule(models.Model):
    title = models.fields.CharField(max_length=256)
    start = models.fields.CharField(max_length=256)
    end = models.fields.CharField(max_length=256)
    background_color = models.fields.CharField(max_length=10)
    border_color = models.fields.CharField(max_length=10)
    text_color = models.fields.CharField(max_length=10)
    description = models.fields.TextField()