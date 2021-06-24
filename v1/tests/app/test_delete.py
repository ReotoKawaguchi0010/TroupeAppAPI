from rest_framework.response import Response
from rest_framework.test import APITestCase
from rest_framework.test import APIClient

from v1.models.performance import Peformance
from v1.config import ENDPOINT


class APITestDelete(APITestCase):

    def setUp(self) -> None:
        performance = Peformance(title='test')
        performance.save()

    def test_delete(self):
        params = '?type=delete_performance&title=test'
        self.client: APIClient = APIClient()
        self.res: Response = self.client.delete(f'{ENDPOINT}app/{params}')
        print(self.res.data)
