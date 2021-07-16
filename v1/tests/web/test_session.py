from rest_framework.response import Response
from rest_framework.test import APITestCase
from rest_framework.test import APIClient

from v1.config import ENDPOINT


class APITestSession(APITestCase):

    def test_post_session(self):
        self.client: APIClient = APIClient()
        self.res: Response = self.client.post(ENDPOINT, {
            'type': 'post_consumer_data',
            'consumer': {
                'first_name': '怜和人',
                'second_name': '河口',
                'kana_first_name': 'レオト',
                'kana_second_name': 'カワグチ',
                'mail_address': 'test@i.softbank.jp',
                'phone_number': '080-0000-0000',
            },
        }, format='json')
        print(self.res.data)

    def test_get_session(self):
        self.client: APIClient = APIClient()
        self.res: Response = self.client.post(ENDPOINT, {
            'type': 'post_consumer_data',
            'consumer': {
                'first_name': '怜和人',
                'second_name': '河口',
                'kana_first_name': 'レオト',
                'kana_second_name': 'カワグチ',
                'mail_address': 'test@i.softbank.jp',
                'phone_number': '080-0000-0000',
            },
        }, format='json')

        self.res: Response = self.client.get(f'{ENDPOINT}?get_consumer_data=true')
        print(self.res.data)
