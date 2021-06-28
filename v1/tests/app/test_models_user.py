from django.test import TestCase
from rest_framework.response import Response
from rest_framework.test import APITestCase
from rest_framework.test import APIClient

from v1.models.user import UserData
from v1.config import ENDPOINT


class TestUserModel(TestCase):

    def setUp(self):
        UserData().create_user(username='reoto_kawaguchi', email='test@test.com', password='reoto_pass',
                               introduction='int', profile_image='https://test.com', contract='test@test.com')

    def test_is_admin_user(self):
        user_data = UserData().login('reoto_kawaguchi', 'reoto_pass')

        if user_data is not None:
            user_data.pprint()

        self.assertIsNotNone(user_data)


class APIUserTest(APITestCase):

    def setUp(self):
        UserData().create_user(username='reoto_kawaguchi', email='test@test.com', password='reoto_pass',
                               introduction='int', profile_image='https://test.com', contract='test@test.com',
                               is_superuser=True)
        self.client = APIClient()
        self.res = self.client.post(f'{ENDPOINT}app/', {
            'type': 'login',
            'send_data': {
                'username': 'reoto_kawaguchi',
                'password': 'reoto_pass',
            },
        }, format='json')

    def test_create_user(self):
        self.res: Response = self.client.post(f'{ENDPOINT}app/', {
            'type': 'create_user',
            'send_data': {
                'username': 'test_user',
                'email': 'test@test.com',
                'password': '1234',
                'introduction': '',
                'profile_image': '',
                'contract': '',
                'is_superuser': False,
            },
        }, format='json')

        print(self.res.data)
