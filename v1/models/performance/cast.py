from django.db import models


class Cast(models.Model):
    cast_name = models.CharField(max_length=256)
    role = models.CharField(max_length=256)
