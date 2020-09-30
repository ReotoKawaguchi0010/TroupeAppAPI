from django.db import models

# Create your models here.

class User(models.Model):
    mail_address = models.CharField(max_length=30)
    password = models.CharField(max_length=20)

class Script(models.Model):
    script = models.CharField(max_length=50)
    color = models.CharField(max_length=16)

class TopPage(models.Model):
    about_us_text = models.CharField(max_length=80)
    recruitment_text = models.CharField(max_length=400)

