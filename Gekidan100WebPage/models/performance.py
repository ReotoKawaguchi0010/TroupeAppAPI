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

