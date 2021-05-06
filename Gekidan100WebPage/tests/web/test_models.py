import datetime
import json

from django.test import TestCase

from Gekidan100WebPage.models.video_ticket import VideoTicket
from Gekidan100WebPage.models.performance_video_list import PerformanceVideoList


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
        video_tickets = VideoTicket.objects.all()

        for video_ticket in video_tickets:
            print(video_ticket.id)
            print(video_ticket.name)
            print(video_ticket.mail_address)
            print(video_ticket.payment_methods)
            print(video_ticket.payer_id)
            print(video_ticket.phone_number)

        self.assertEqual(len(video_tickets) >= 1, True)
