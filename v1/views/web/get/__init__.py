from rest_framework.response import Response

from v1.api import ameba_api
from v1.api.paypal import PayPAlClient
from v1.api.twitter_api import TwitterApi
from v1.utils.status_codes import OK
from v1.utils.http import has_get_type
from v1.views.session.web.payer_transient_info import SessionPayerTransientInfo
from v1.models.performance_video_list import PerformanceVideoList


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


def get_has_video_ticket(request, response):
    pay_client = PayPAlClient()
    pay_url = pay_client.get_payment_url()
    data = {'video_ticket': True, 'url': pay_url}
    response.data = data
    return response


def get_paypal_pay_out(request, response):
    pay_id = request.GET.get('paymentId')
    payer_id = request.GET.get('PayerID')
    pay_client = PayPAlClient()
    exec_payment = pay_client.get_execute_payment(pay_id, payer_id)
    if exec_payment['bool']:
        request.session['video_ticket'] = 'video_id'
        if not request.session.session_key:
            request.session.create()
        response.set_cookie('sessionid', request.session.session_key)
        response.data = {'exec': exec_payment, 'buy': True}
    return response


def get_has_video_ticket_session(request, response):
    if request.GET.get('video_id') != '4':
        response.data = {'video_exits': False}
        return response
    if request.session.get('video_ticket') is None:
        response.data = {'bought_ticket': False, 'url': '', 'video_exits': True}
    else:
        response.data = {'bought_ticket': True, 'url': '', 'video_exits': True}
    return response

def get_performance_video_list(response):
    response.data = PerformanceVideoList().read_all()
    return response

def get_consumer_data(request, response: Response):
    session_admin = SessionPayerTransientInfo(request=request, response=response)
    response.data = session_admin.get()
    return response


def main(request, response: Response):
    if has_get_type(request, 'video_ticket'):
        response = get_has_video_ticket(request, response)
    elif has_get_type(request, 'paymentId', 'PayerID'):
        payer_session = SessionPayerTransientInfo(request, response).get_payer_transient_info()
        response = get_paypal_pay_out(request, response)
    elif has_get_type(request, 'video_id'):
        response = get_has_video_ticket_session(request, response)
    elif has_get_type(request, 'get_performance_video_list'):
        response = get_performance_video_list(response)
    elif has_get_type(request, 'get_consumer_data'):
        response = get_consumer_data(request, response)
    else:
        response = home_page(request, response)
    return response
