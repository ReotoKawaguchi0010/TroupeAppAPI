from rest_framework.response import Response

from v1.views.session import SessionAdminWebPage
from futsu100_api.config.config import CUSTOM_SESSION_COOKIE_NAME


class SessionPayerTransientInfo(SessionAdminWebPage):
    name = 'payer_transient_info'

    def __init__(self, request, response: Response):
        super().__init__(request, response)
        self.request.session.set_expiry(60*60)
        self.payment_method = ''
        self.first_name = ''
        self.second_name = ''
        self.kana_first_name = ''
        self.kana_second_name = ''
        self.mail_address = ''
        self.phone_number = ''
        if self.has_payer_transient_info(self.data):
            self.data = self.data['payer']

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

    def get_payer_transient_info(self):
        session_data = self.request.session.get(self.name)
        session_data = self.dict_unserialize(session_data)
        if session_data is not None:
            self.payment_method = session_data['payment_method']
            self.first_name = session_data['first_name']
            self.second_name = session_data['second_name']
            self.kana_first_name = session_data['kana_first_name']
            self.kana_second_name = session_data['kana_second_name']
            self.mail_address = session_data['mail_address']
            self.phone_number = session_data['phone_number']
            return self
        return None

    def create_consumer(self, data):
        if 'consumer' in data:
            data = data['consumer']
            self.request.session[self.name] = data
            self.request.session.create()
            self.response.set_cookie(CUSTOM_SESSION_COOKIE_NAME, self.request.session.session_key)
            self.response.data = {
                'status': 200,
                'message': 'consumer data save',
            }
        return self.response

    def get(self):
        session_data = self.request.session.get(self.name)
        return session_data
