import json

from django.db import models
from django.contrib.auth import authenticate
from django.contrib.auth.models import User


class UserData(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    introduction = models.TextField()
    profile_image = models.TextField()
    contract = models.TextField()

    def create_user(self, username, email=None, password=None,
                    introduction='', profile_image='', contract='', **extra_fields):
        user = User.objects.create_user(username=username, email=email,
                                        password=password, **extra_fields)
        user.save()
        self.user = user
        self.introduction = introduction
        self.profile_image = profile_image
        self.contract = contract
        self.save()
        return self

    def read_all(self):
        return [{'username': i.user.username, 'first_name': i.user.first_name,
                 'last_name': i.user.last_name} for i in self.__class__.objects.all()]

    def is_admin_user(self):
        return self.user.is_superuser

    def check_password(self, password):
        if self.user.check_password(password):
            return self
        return None

    def login(self, username, password):
        username = authenticate(username=username, password=password)
        if username is not None:
            user_data = self.__class__.objects.get(user__username=username)
            return user_data.check_password(password)
        return None

    def json_serializer(self):
        data = {
            'username': self.user.username,
            'first_name': self.user.first_name,
            'last_name': self.user.last_name,
            'email': self.user.email,
            'introduction': self.introduction,
            'profile_image': self.profile_image,
            'contract': self.contract,
            'is_superuser': self.user.is_superuser,
        }
        return json.dumps(data)

    def pprint(self):
        for k, v in self.__getstate__().items():
            print('*' * 50)
            print(f'* {k} = {v}')
        print('*' * 50)
