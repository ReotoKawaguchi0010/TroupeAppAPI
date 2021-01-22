from rest_framework.response import Response

from Gekidan100WebPage.api import ameba_api
from Gekidan100WebPage.api.paypal import PayPAlClient
from Gekidan100WebPage.api.twitter_api import TwitterApi
from Gekidan100WebPage.utils.status_codes import UNAUTHORIZED, OK
from Gekidan100WebPage.utils.http import has_get_type


def home_page(request, response):
    news_text = ''
    about_us_text = ''
    blog_text = ameba_api.get_ameba_content()
    tweet = TwitterApi()
    twitter_text = tweet.user_timeline(5)
    recruitment_text = ''
    data = {'status': OK, 'texts': {'news': news_text, 'about_us': about_us_text, 'blog': blog_text,
                                      'twitter': twitter_text, 'recruitment': recruitment_text}}
    response.data = data
    return response

def video_ticket(request, response):
    pay_client = PayPAlClient()
    pay_url = pay_client.get_payment_url()
    data = {'video_ticket': 'true', 'url': pay_url}
    response.data = data
    return response

def pay_out(request, response):
    pay_id = request.GET.get('paymentId')
    payer_id = request.GET.get('PayerID')
    pay_client = PayPAlClient()
    exec = pay_client.get_execute_payment(pay_id, payer_id)
    if exec:
        data = {'exec': exec}
        response.data = data
    return response

def is_check_video_ticket(request, response):
    if request.session.get('video_ticket') is None:
        request.session['video_ticket'] = 'video_id'
        if not request.session.session_key:
            request.session.create()
        status = {'fail': {'status_code': UNAUTHORIZED}, 'bool': 0}
        response.data = status
        response.set_cookie('sessionid', request.session.session_key)
    else:
        status = {'success': {'status_code': OK}, 'bool': 1}
        response.data = status
        return response
    return response


def main(request, response: Response):
    if has_get_type(request, 'video_ticket'):
        response = video_ticket(request, response)
    elif has_get_type(request, 'paymentId', 'PayerID'):
        response = pay_out(request, response)
    elif has_get_type('videoId'):
        response = is_check_video_ticket(request, response)
    else:
        response = home_page(request, response)
    return response