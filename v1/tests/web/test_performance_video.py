import datetime
import json

from django.test import TestCase
from rest_framework.response import Response
from rest_framework.test import APITestCase
from rest_framework.test import APIClient

from v1.models.performance_video_list import PerformanceVideoList
from v1.config import ENDPOINT


class APITestRequestPayment(APITestCase, TestCase):

    def setUp(self):
        data = {
            'performance_num': 4,
            'item_name': 'ゲキダン！〜テクノロジーの惑星から愛の使者がやってきた〜',
            'top_image': 'https://test/com',
            'release_date': datetime.datetime.now(),
            'price': '1500',
            'payment_methods': json.dumps(['paypal', '振り込み']),
            'synopsis': 'texttexttexttexttexttexttext',
            'images': json.dumps([{"url": "test.com", "title": "text"}, {"url": "test.com", "title": "text"}]),
        }

        PerformanceVideoList().create(data)

    def test_get_performance_video_list(self):
        client = APIClient()
        res: Response = client.get(ENDPOINT, {
            'get_performance_video_list': 'all'
        }, format='json')
        print(res.data)
