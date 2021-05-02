from django.test import TestCase

from Gekidan100WebPage.models.video_ticket import VideoTicket
from Gekidan100WebPage.models.performance.script import Script


class VideoTicketModelTests(TestCase):
    def setUp(self):
        video_ticket = VideoTicket()
        video_ticket.create(payment_methods='transfer',
                                   mail_address='test.jp', payment_id='6436nio532hiohi3',
                                   payer_id='testtes53798hofas3', token='tokengdsgjio2426')



    def test_create_video_ticket_model(self):
        video_tickets = VideoTicket.objects.all()

        for video_ticket in video_tickets:
            print(video_ticket.id)


        return 'hello'

class ScriptModelTests(TestCase):
    def setUp(self):
        script = Script(script='test')
        script.save()

    def test_read_script(self):
        scripts = Script.objects.all()
        print(scripts)
        for script in scripts:
            print(script.script)