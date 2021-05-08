from django.http.request import HttpRequest
from django.contrib.sessions.backends.db import SessionStore
from rest_framework.response import Response

from Gekidan100WebPage.models.user import UserData
from Gekidan100WebPage.views.session import SessionAdminWebPage


class SessionUserAdminWebApp(SessionAdminWebPage):
    name = 'user_data'

    def __init__(self, request: HttpRequest, response: Response, user_data: UserData = None):
        super().__init__(request, response)
        self.user_data = user_data
        self.request.session.set_expiry(60*60)

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

    def create_session(self):
        if self.user_data is not None:
            s = SessionStore()
            s[self.name] = self.user_data.json_serializer()
            s.create()
            s = SessionStore(session_key=s.session_key)
            self.request.session = s
            self.response.data = {
                'status': '200', 'bool': True, 'login': 'success',
                'user': {
                    'username': self.user_data.user.username,
                    'first_name': self.user_data.user.first_name,
                    'last_name': self.user_data.user.last_name,
                    'email': self.user_data.user.email,
                    'introduction': self.user_data.introduction,
                    'profile_image': self.user_data.profile_image,
                    'contract': self.user_data.contract,
                    'is_super_user': self.user_data.user.is_superuser
                }
            }
        return self.response

    def is_login(self):
        user_data = self.request.session.get(self.name)
        if user_data is None:
            return False
        return True
