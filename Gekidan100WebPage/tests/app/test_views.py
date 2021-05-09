from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.test import APITestCase, APIClient

from Gekidan100WebPage.models.user import UserData


class APITestLogin(APITestCase, TestCase):
    def setUp(self):
        UserData().create_user(username='reoto_kawaguchi', email='test@test.com', password='reoto_pass',
                               introduction='int', profile_image='https://test.com', contract='test@test.com')

    def test_login(self):
        client = APIClient()
        res: Response = client.post('/api/app/', {
            'type': 'login',
            'send_data': {
                'username': 'reoto_kawaguchi',
                'password': 'reoto_pass',
            },
        }, format='json')
        self.assertIsNotNone(res)

        print(res.data)

        res = client.get('/api/app/?type=get_user_data')
        print(res.data)
