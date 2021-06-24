from rest_framework.response import Response
from rest_framework.test import APITestCase
from rest_framework.test import APIClient

from v1.config import ENDPOINT


class APITestIdea(APITestCase):

    def test_create_idea(self):
        self.client: APIClient = APIClient()
        self.res: Response = self.client.post(f'{ENDPOINT}app/', {
            'type': 'idea',
            'author': 'reoto',
            'item_values': [
                {
                    'name': 'タイトル',
                    'value': 'test',
                },
                {
                    'name': 'test1',
                    'value': 'tet',
                },
            ],
        }, format='json')

        print(self.res.data)
