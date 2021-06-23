import json

from django.test import TestCase
from rest_framework.response import Response
from rest_framework.test import APITestCase
from rest_framework.test import APIClient

from v1.models.user import UserData
from v1.config import ENDPOINT
from v1.models.performance_video_list import PerformanceVideoList


class APITestLogin(APITestCase, TestCase):
    def setUp(self):
        UserData().create_user(username='reoto_kawaguchi', email='test@test.com', password='reoto_pass',
                               introduction='int', profile_image='https://test.com', contract='test@test.com')

    def test_login(self):
        self.client = APIClient()
        res: Response = self.client.post('/api/v1/app/', {
            'type': 'login',
            'send_data': {
                'username': 'reoto_kawaguchi',
                'password': 'reoto_pass',
            },
        }, format='json')
        self.assertIsNotNone(res)

        print(res.data)
        res = self.client.get('/api/v1/app/?type=get_user_data&url=test.com')
        print(res.data)

    def test_create_sale(self):
        res: Response = self.client.post(f'{ENDPOINT}app/', {
            'type': 'create_sale',
            'send_data': {
                'performance_num': 4,
                'item_name': 'ゲキダン！〜テクノロジーの惑星から愛の使者がやってきた〜',
                'top_image': 'https://test/com',
                'release_date': '2021-06-07',
                'price': '1500',
                'payment_methods': ['paypal', '振り込み'],
                'synopsis': 'texttexttexttexttexttexttext',
                'images': [{"url": "test.com", "title": "text"}, {"url": "test.com", "title": "text"}],
            }
        }, format='json')
        print(res.data)


class APITestSale(APITestCase):
    def setUp(self) -> None:
        self.res: Response = self.client.post(f'{ENDPOINT}app/', {
            'type': 'create_sale',
            'send_data': {
                'performance_num': 1,
                'item_name': 'ゲキダン！〜テクノロジーの惑星から愛の使者がやってきた〜',
                'top_image': 'https://test/com',
                'release_date': '2021-06-07',
                'price': 1500,
                'payment_methods': ['paypal', '振り込み'],
                'synopsis': 'texttexttexttexttexttexttext',
                'images': [{"url": "test.com", "title": "text"}, {"url": "test.com", "title": "text"}],
            }
        }, format='json')

    def test_get_sale_list(self):
        self.client: APIClient = APIClient()
        self.res: Response = self.client.get(f'{ENDPOINT}app/', {
            'type': 'get_sale',
            'get': '1',
        })
        print(self.res.data)
