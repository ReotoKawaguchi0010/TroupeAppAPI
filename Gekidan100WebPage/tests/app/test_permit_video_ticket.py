import datetime
import json

from rest_framework.response import Response
from rest_framework.test import APITestCase, APIClient

from Gekidan100WebPage.models.user import UserData
from Gekidan100WebPage.models.video_ticket import VideoTicket
from Gekidan100WebPage.models.performance_video_list import PerformanceVideoList


class APITestChangePermitVideoTicket(APITestCase):
    def setUp(self):
        UserData().create_user(username='reoto_kawaguchi', email='test@test.com', password='reoto_pass',
                               introduction='int', profile_image='https://test.com', contract='test@test.com',
                               is_superuser=True)

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

        data = {
            'name': '河口 怜和人',
            'performance_num': 4,
            'kana_name': 'カワグチ レオト',
            'payment_methods': 'transfer',
            'mail_address': 'hello.jp',
            'phone_number': '000-0000-0000',
            'payment_id': '6436nio532hiohi3',
            'payer_id': 'testtes53798hofas3',
            'token': 'gsgoiifaf',
        }
        VideoTicket().create(data)

        self.client = APIClient()
        self.res: Response = self.client.post('/api/app/', {
            'type': 'login',
            'send_data': {
                'username': 'reoto_kawaguchi',
                'password': 'reoto_pass',
            },
        }, format='json')

        print(self.res.data)

    def test_permit_change(self):
        self.res = self.client.post('/api/app/', {
            'type': 'video_ticket_permit',
            'send_data': {
                'video_ticket_num': 1,
                'previous_permit': False,
                'next_permit': True,
            }
        }, format='json')
        print(self.res.data)
