import json

from django.test import TestCase
from rest_framework.response import Response
from rest_framework.test import APITestCase, APIClient


TEST_PAYMENT_ID = 'PAYID-MCIEGCI6GX50624X8279010B'
TEST_PAYER_ID = 'ZQFR8L8CNFDC6'
TEST_TOKEN = 'EC-0XH30116YU841021E'

class APITestRequestPayment(APITestCase, TestCase):
    def setUp(self):
        client = APIClient()
        client.post('/api/', {
            'type': 'test',
        }, format='json')


    def test_paypal_payment_api(self):
        client = APIClient()
        res: Response = client.get(f'/api/?paymentId={TEST_PAYMENT_ID}&PayerID={TEST_PAYER_ID}&token={TEST_TOKEN}', format='json', content_type='application/json')
        print(res.data)
        self.assertEqual(res.data!='', True)




class APITestRequest(APITestCase):

    def test_api(self):
        client = APIClient()
        res: Response = client.get('/api/', {'video_ticket': 'true'}, format='json')
        self.assertEqual(res.data != {}, True)
        print(type(res.data))
