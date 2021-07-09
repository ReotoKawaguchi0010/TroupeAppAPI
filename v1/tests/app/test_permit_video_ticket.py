import datetime
import json

from rest_framework.response import Response
from rest_framework.test import APITestCase, APIClient

from v1.config import ENDPOINT
from v1.models.user import User
from v1.models.video_ticket import VideoTicket
from v1.models.performance_video_list import PerformanceVideoList


class APITestChangePermitVideoTicket(APITestCase):
    def setUp(self):
        User().create_user(username='reoto_kawaguchi', email='test@test.com', password='reoto_pass',
                               introduction='int', profile_image='https://test.com', contract='test@test.com',
                               is_superuser=True)

        data = {
            'performance_num': 4,
            'item_name': 'ゲキダン！〜テクノロジーの惑星から愛の使者がやってきた〜',
            'top_image': 'https://test/com',
            'release_date': '2020-01-01',
            'price': '1500',
            'payment_methods': json.dumps(['paypal', '振り込み']),
            'synopsis': 'texttexttexttexttexttexttext',
            'images': json.dumps([{"url": "test.com", "title": "text"}, {"url": "test.com", "title": "text"}]),
        }
        PerformanceVideoList().create(performance_num=data['performance_num'], item_name=data['item_name'],
                                      top_image=data['top_image'], release_date=data['release_date'],
                                      price=data['price'], payment_methods=data['payment_methods'],
                                      synopsis=data['synopsis'], images=data['images'])

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
        self.res: Response = self.client.post(f'{ENDPOINT}app/', {
            'type': 'login',
            'send_data': {
                'username': 'reoto_kawaguchi',
                'password': 'reoto_pass',
            },
        }, format='json')

        print(self.res.data)

    def test_permit_change(self):
        self.res = self.client.post(f'{ENDPOINT}app/', {
            'type': 'video_ticket_permit',
            'send_data': {
                'video_ticket_num': 1,
                'previous_permit': False,
                'next_permit': True,
            }
        }, format='json')
        print(self.res.data)

    def test_get_ticket_member_list(self):
        self.res: Response = self.client.get(f'{ENDPOINT}app/', {
            'type': 'get_purchased_video_ticket_user'
        })
        print(self.res.data)

    def test_delete_performance_list(self):
        p = PerformanceVideoList().delete_at_performance_num(4)
        print(p)

    def test_delete_performance_list_api(self):
        params = '?type=delete_performance_list&performance_num=4'
        self.res = self.client.delete(f'{ENDPOINT}app/{params}')
        print(self.res.data)

    def test_update_performance_list(self):
        recipient_data = PerformanceVideoList().read(4)
        update_data = recipient_data
        update_data['price'] = 2000

        self.res = self.client.put(f'{ENDPOINT}app/', {
            'type': 'update_performance_list',
            'performance_num': 4,
            'update_data': update_data,
        }, format='json')
        print(self.res.data)
