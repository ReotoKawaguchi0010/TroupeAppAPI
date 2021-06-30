import json

from django.db import models
from django.contrib.auth.hashers import make_password
from django.db.utils import DatabaseErrorWrapper
from django.contrib.auth import authenticate
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    introduction = models.TextField()
    profile_image = models.TextField()
    contract = models.TextField()

    @staticmethod
    def has_data(data: dict):
        return data.keys() >= {
            'username',
            'email',
            'password',
            'introduction',
            'profile_image',
            'contract',
            'is_superuser',
        }

    @staticmethod
    def fail(message):
        return {
            'message': message,
            'bool': False,
        }

    def success(self):
        return {
            'message': 'success',
            'bool': True,
            'user_data': {
                'username': self.username,
                'email': self.email,
                'first_name': self.first_name,
                'last_name': self.last_name,
                'introduction': self.introduction,
                'is_superuser': self.is_superuser,
            },
        }

    def create_user(self, username, email=None, password=None,
                    introduction='', profile_image='', contract='', is_superuser=False):
        self.username = username
        self.email = email
        self.password = make_password(password)
        self.introduction = introduction
        self.profile_image = profile_image
        self.contract = contract
        self.is_superuser = is_superuser
        self.save()
        return self

    def update(self, prev_username, **extra_fields):
        user_data = self.__class__.objects.filter(username=prev_username)
        if not user_data.exists():
            return {'status': '400', 'message': 'user not exists'}
        user_data = user_data[0]
        for k, v in extra_fields.items():
            if k == 'username':
                user_data.username = v
            elif k == 'contract':
                user_data.contract = v
            elif k == 'first_name':
                user_data.first_name = v
            elif k == 'last_name':
                user_data.last_name = v
            elif k == 'introduction':
                user_data.introduction = v
            elif k == 'profile_image':
                user_data.profile_image = v
        user_data.save()
        return {'status': '200', 'message': 'success'}

    def read_all(self):
        return [{'username': i.username, 'first_name': i.first_name,
                 'last_name': i.last_name} for i in self.__class__.objects.all()]

    def is_admin_user(self):
        return self.is_superuser

    def login(self, username, password):
        username = authenticate(username=username, password=password)
        if username is not None:
            user_data = self.__class__.objects.get(username=username)
            if user_data.check_password(password):
                return user_data
        return None

    def json_serializer(self):
        data = {
            'username': self.username,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'introduction': self.introduction,
            'profile_image': self.profile_image,
            'contract': self.contract,
            'is_superuser': self.is_superuser,
        }
        return json.dumps(data)

    def pprint(self):
        for k, v in self.__getstate__().items():
            print('*' * 50)
            print(f'* {k} = {v}')
        print('*' * 50)

    def trial(self, data: dict):
        if self.has_data(data):
            username = data['username']
            email = data['email']
            password = data['password']
            introduction = data['introduction']
            profile_image = data['profile_image']
            contract = data['contract']
            is_superuser = data['is_superuser']
            try:
                self.create_user(username=username,
                                 email=email,
                                 password=password,
                                 introduction=introduction,
                                 profile_image=profile_image,
                                 contract=contract,
                                 is_superuser=is_superuser)
            except DatabaseErrorWrapper:
                return self.fail('fail')
        return self.success()
