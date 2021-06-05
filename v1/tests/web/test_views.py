from django.test import TestCase
from django.contrib.sessions.backends.cache import SessionStore
from rest_framework.response import Response
from rest_framework.test import APITestCase
from rest_framework.test import APIClient

from v1.config import PAYPAL_TEST_PAYMENT_ID
from v1.config import PAYPAL_TEST_PAYER_ID
from v1.config import PAYPAL_TEST_TOKEN
from v1.config import ENDPOINT


class APITestRequestPayment(APITestCase, TestCase):

    def setUp(self):
        self.client = APIClient()
        self.res = self.client.post(ENDPOINT, {
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
            f'/api/?paymentId={PAYPAL_TEST_PAYMENT_ID}&PayerID={PAYPAL_TEST_PAYER_ID}&token={PAYPAL_TEST_TOKEN}',
            format='json')
        print(self.res.data)
        self.assertEqual(self.res.data != '', True)


class APITestRequest(APITestCase):

    def test_api(self):
        client = APIClient()
        res: Response = client.get(ENDPOINT, {'video_ticket': 'true'}, format='json')
        self.assertEqual(res.data != {}, True)
        print(type(res.data))
