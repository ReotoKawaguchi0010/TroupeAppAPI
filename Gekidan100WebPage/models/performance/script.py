import os
from django.db import models



class Script(models.Model):
    script = models.FileField(upload_to=os.path.join(''))
