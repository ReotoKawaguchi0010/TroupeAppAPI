from django.test import TestCase

from Gekidan100WebPage.models.video_ticket import VideoTicket
from Gekidan100WebPage.models.performance.script import Script


class VideoTicketModelTests(TestCase):
    def setUp(self):
        data = {
            'name': '河口 怜和人',
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


        self.assertEqual(len(video_tickets)>=1, True)

class ScriptModelTests(TestCase):
    def setUp(self):
        script = Script(script='hello')
        script.save()

        script = Script(script='test')
        script.save()

    def test_read_script(self):
        scripts = Script.objects.all()
        print(scripts)
        for script in scripts:
            print(script.script)