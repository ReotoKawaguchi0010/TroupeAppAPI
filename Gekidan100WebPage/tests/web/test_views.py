from django.test import TestCase
from django.contrib.sessions.backends.cache import SessionStore
from rest_framework.response import Response
from rest_framework.test import APITestCase, APIClient

TEST_PAYMENT_ID = 'PAYID-MCIEGCI6GX50624X8279010B'
TEST_PAYER_ID = 'ZQFR8L8CNFDC6'
TEST_TOKEN = 'EC-0XH30116YU841021E'


class APITestRequestPayment(APITestCase, TestCase):

    def setUp(self):
        self.client = APIClient()
        self.res = self.client.post('/api/', {
            'type': 'payer_transient_info',
            'payer': {
                'payment_method': 'paypal',
                'first_name': '怜和人',
                'second_name': '河口',
                'kana_first_name': 'レオト',
                'kana_second_name': 'カワグチ',
                'mail_address': 'zimao@futsu100.com',
                'phone_number': '000-0000-0000',
            }
        }, format='json')

    def test_paypal_payment_api(self):
        session: SessionStore = self.client.session
        print(session.values())
        self.res: Response = self.client.get(
            f'/api/?paymentId={TEST_PAYMENT_ID}&PayerID={TEST_PAYER_ID}&token={TEST_TOKEN}',
            format='json')
        print(self.res.data)
        self.assertEqual(self.res.data != '', True)


class APITestRequest(APITestCase):

    def test_api(self):
        client = APIClient()
        res: Response = client.get('/api/', {'video_ticket': 'true'}, format='json')
        self.assertEqual(res.data != {}, True)
        print(type(res.data))
