from django.http.request import HttpRequest
from rest_framework.response import Response

from Gekidan100WebPage.models.user import UserData
from Gekidan100WebPage.views.session import SessionAdminWebPage


class SessionUserAdminWebApp(SessionAdminWebPage):

    def __init__(self, request: HttpRequest, response: Response):
        super().__init__(request, response)


        self.username = ''
        self.time = ''

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