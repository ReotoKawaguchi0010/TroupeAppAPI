from django.core.handlers.wsgi import WSGIRequest

from Gekidan100WebPage.api.paypal import PayPAlClient
from Gekidan100WebPage.models.models import VideoTicket

def video_ticket(request: WSGIRequest):
    pay_client = PayPAlClient()
    pay_url = pay_client.get_payment_url()
    out = {'video_ticket': 'true', 'url': pay_url}
    return out

def pay_out(request: WSGIRequest, pay_id, payer_id):
    pay_client = PayPAlClient()
    exec = pay_client.get_execute_payment(pay_id, payer_id)
    if exec:
        return exec
    out = {'exec': exec}
    return out