import json

from django.http.request import HttpRequest
from rest_framework.response import Response

from futsu100_api.config.config import CUSTOM_SESSION_COOKIE_NAME
from v1.models.user import UserData
from v1.views.session import SessionAdminWebPage


class SessionUserAdminWebApp(SessionAdminWebPage):
    name = 'user_data'

    def __init__(self, request: HttpRequest, response: Response, user_data: UserData = None):
        super().__init__(request, response)
        self.user_data = user_data
        self.request.session.set_expiry(60*60)
        self.session_data = ''

    @staticmethod
    def has_payer_transient_info(data):

        if 'payer' in data:
            return data['payer'].keys() >= {
                'payment_method',
                'first_name',
                'second_name',
                'kana_first_name',
                'kana_second_name',
                'mail_address',
                'phone_number',
            }
        return False

    def json_serializer(self):
        return self.user_data.json_serializer()

    def json_unserializer(self):
        return json.loads(self.session_data)

    def create_session(self):
        if self.user_data is not None:
            self.request.session[self.name] = self.json_serializer()
            self.request.session.create()
            self.response.set_cookie(CUSTOM_SESSION_COOKIE_NAME, self.request.session.session_key)
            self.response.data = {
                'status': 200, 'bool': True, 'login': 'success',
                'run': True, 'to': '/app',
                'user': {
                    'username': self.user_data.user.username,
                    'first_name': self.user_data.user.first_name,
                    'last_name': self.user_data.user.last_name,
                    'email': self.user_data.user.email,
                    'introduction': self.user_data.introduction,
                    'profile_image': self.user_data.profile_image,
                    'contract': self.user_data.contract,
                    'is_superuser': self.user_data.user.is_superuser
                }
            }
        return self.response

    def delete_session(self):
        if self.is_login():
            self.request.session.delete(self.name)
            return True
        return False

    def is_login(self):
        user_data = self.request.session.get(self.name)
        if user_data is None:
            return False
        return True

    def is_superuser(self):
        if self.is_login():
            self.session_data = self.request.session.get(self.name)
            data = self.json_unserializer()
            user_data = UserData.objects.get(user__username=data['username'])
            return user_data.is_admin_user()
        return False

    def get_session(self, url):
        run = False
        to = url
        if 'login' in url:
            run = True
            to = '/app'
        self.session_data = self.request.session.get(self.name)
        data = self.json_unserializer()
        return {
            'status': 300, 'bool': True, 'login': 'success',
            'run': run, 'to': to,
            'user': {
                'username': data['username'],
                'first_name': data['first_name'],
                'last_name': data['last_name'],
                'email': data['email'],
                'introduction': data['introduction'],
                'profile_image': data['profile_image'],
                'contract': data['contract'],
                'is_superuser': data['is_superuser'],
            }
        }
