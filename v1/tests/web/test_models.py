import datetime
import json

from django.test import TestCase

from v1.models.video_ticket import VideoTicket
from v1.models.performance_video_list import PerformanceVideoList


class VideoTicketModelTests(TestCase):
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

        video_ticket = VideoTicket()
        video_ticket.create(data)

    def test_create_video_ticket_model(self):
        video_tickets = VideoTicket().read_all()

        for video_ticket in video_tickets:
            print(video_ticket.id)
            print(video_ticket.auth_code)
            print(video_ticket.token)

        self.assertEqual(len(video_tickets) >= 1, True)

    def test_get_auth_code(self):
        video_ticket = VideoTicket.objects.get(id=1)
        auth_code = video_ticket.auth_code

        video_ticket = VideoTicket.objects.get(auth_code=auth_code)
        video_ticket.print()

    def test_change_permit(self):
        video_ticket = VideoTicket.objects.get(id=1)
        video_ticket.print()

        print('')

        video_ticket.permit_change()
        video_ticket = VideoTicket.objects.get(id=1)
        video_ticket.print()

    def test_get_performance_video_list(self):
        all = PerformanceVideoList().read_all()
        print(all)
