from django.db import models
from django.contrib.auth.models import User


class UserData(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    introduction = models.TextField()
    profile_image = models.TextField()
    contract = models.TextField()

    def read_all(self):
        return [{'username': i.user.username, 'first_name': i.user.first_name,
                 'last_name': i.user.last_name} for i in self.__class__.objects.all()]

    def is_admin_user(self):
        return self.user.is_superuser

    def is_username_exists(self, username):
        return self.__class__.objects.filter(user__username=username).exists()

    def login(self, username, password):
        if self.is_username_exists(username):
            user_data = self.__class__.objects.get(user__username=username)
            print(user_data.user.username == username)
            print(user_data.user.password == password)
            return user_data.user.check_password(password)
        return False
