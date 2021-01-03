from django.db import models

class Peformance(models.Model):
    title = models.fields.CharField(max_length=256)
    performance_date = models.fields.CharField(max_length=256)

class Cast(models.Model):
    cast_name = models.CharField(max_length=256)
    role = models.CharField(max_length=256)

class Staff(models.Model):
    staff_name = models.CharField(max_length=256)
    role = models.CharField(max_length=256)

class Schedule(models.Model):
    title = models.fields.CharField(max_length=256)
    start = models.fields.CharField(max_length=256)
    end = models.fields.CharField(max_length=256)
    background_color = models.fields.CharField(max_length=10)
    border_color = models.fields.CharField(max_length=10)
    text_color = models.fields.CharField(max_length=10)
    description = models.fields.TextField()

