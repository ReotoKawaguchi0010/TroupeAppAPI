from django.db import models
from django.contrib.auth.models import User

class UserData(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    introduction = models.TextField()
    profile_image = models.TextField()
    contract = models.TextField()

    def read_all(self):
        return [{'username': i.user.username, 'first_name': i.user.first_name,
                 'last_name': i.user.last_name} for i in self.__class__.objects.all()]