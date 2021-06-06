from rest_framework.response import Response
from rest_framework.test import APITestCase
from rest_framework.test import APIClient

from v1.config import ENDPOINT

class APITestMail(APITestCase):

    def setUp(self):
        self.client = APIClient()
        self.res: Response = self.client.post(f'{ENDPOINT}mail', {
            'first_name': '怜和人',
            'second_name': '河口',
            'first_phonetic': 'レオト',
            'second_phonetic': 'カワグチ',
            'mail_address': 'zimao@futsu100.com',
            'address': 'test_address',
            'cities': 'test_cities',
            'house_number': 'test_house_number',
            'profession': 'test_profession',
            'text_area': 'test_text_area',
        }, format='json')

    def test_response_mail(self):
        print(self.res.data)
        self.assertEqual(self.res.data['message'], '送信完了')

