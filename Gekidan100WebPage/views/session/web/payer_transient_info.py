from rest_framework.response import Response

from Gekidan100WebPage.views.session import SessionAdminWebPage


class SessionPayerTransientInfo(SessionAdminWebPage):

    def __init__(self, request, response: Response):
        super().__init__(request, response)
        self.payment_method = ''
        self.first_name = ''
        self.second_name = ''
        self.kana_first_name = ''
        self.kana_second_name = ''
        self.mail_address = ''
        self.phone_number = ''
        self.session_name = 'payer_transient_info'
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
        session_data = self.request.session.get(self.session_name)
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
