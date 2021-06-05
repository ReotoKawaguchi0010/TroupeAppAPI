from django.db import models


class Staff(models.Model):
    staff_name = models.CharField(max_length=256)
    role = models.CharField(max_length=256)
