from django.test import TestCase
from rest_framework.response import Response
from rest_framework.test import APITestCase, APIClient




class APITestRequest(APITestCase):

    def test_api(self):
        client = APIClient()
        res: Response = client.get('/api/', {'video_ticket': 'true'}, format='json')
        print(res.data)

        return None