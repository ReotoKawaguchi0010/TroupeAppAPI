from django.test import TestCase
from django.contrib.auth.models import User
from django.contrib.sessions.backends.cache import SessionStore
from rest_framework.response import Response
from rest_framework.test import APITestCase, APIClient

from Gekidan100WebPage.models.user import UserData


class APITestLogin(APITestCase, TestCase):
    def setUp(self):
        user = User(username='reoto_kawaguchi', password='reoto_kawaguchi', is_superuser=True)
        user.save()
        user_data = UserData(user=User.objects.get(username='reoto_kawaguchi'), introduction='into', profile_image='https://test.com', contract='mail')
        user_data.save()

    def test_login(self):
        self.client = APIClient()
        self.res: Response = self.client.post('/api/app/', {
            'type': 'login',
            'send_data': {
                'username': 'reoto_kawaguchi',
                'password': 'reoto_kawaguchi',
            },
        }, format='json')

        print(self.res.data)
