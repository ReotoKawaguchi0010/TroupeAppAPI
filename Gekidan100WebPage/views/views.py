import datetime

import json

from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view

from Gekidan100WebPage.views.personal import routing_in_member
from Gekidan100WebPage.api import ameba_api
from Gekidan100WebPage.utils.util import is_port_local_content_type, time_subtraction
from Gekidan100WebPage.utils.mail import info_send_mail, info_response_mail
from Gekidan100WebPage.utils.status_codes import UNAUTHORIZED, OK
from Gekidan100WebPage.api.twitter_api import TwitterApi
from Gekidan100WebPage.views import gets, views_app

@api_view(['GET', 'POST'])
def init_page(request):
    content_type = is_port_local_content_type(request)
    response = Response({}, content_type=content_type)
    if request.method == 'GET':
        if request.GET.get('video_ticket'):
            output = gets.video_ticket(request)
        elif request.GET.get('paymentId') and request.GET.get('PayerID'):
            output = gets.pay_out(request, request.GET.get('paymentId'), request.GET.get('PayerID'))
        elif request.GET.get('videoId'):
            if request.session.get('video_ticket') is None:
                request.session['video_ticket'] = 'video_id'
                if not request.session.session_key:
                    request.session.create()
                status = {'fail': {'status_code': UNAUTHORIZED}, 'bool': 0}
                response.data = status
                response.set_cookie('sessionid', request.session.session_key)
                return response
            else:
                status = {'success': {'status_code': OK}, 'bool': 1}
                response.data = status
                return response
        else:
            tweet = TwitterApi()
            news_text = ''
            about_us_text = ''
            blog_text = ameba_api.get_ameba_content()
            twitter_text = tweet.user_timeline(5)
            recruitment_text = ''
            output = {'status': OK, 'texts': {'news': news_text, 'about_us': about_us_text, 'blog': blog_text,
                                          'twitter': twitter_text, 'recruitment': recruitment_text}}
        response.data = output
        return response
    return response

@api_view(['POST'])
def send_mail(request):
    response = Response({}, content_type='application/json')
    try:
        req_body = request.body.decode(encoding='utf-8')
        req_body = json.loads(req_body)
        print(req_body)
        info_send_mail(req_body['mailAddress'], req_body, req_body['content'])
        info_response_mail(req_body['mailAddress'], req_body, req_body['content'])
        output = {'status_code': OK, 'bool': 'true',
                  'timestamp': datetime.datetime.now().timestamp()}
    except:
        output = {'status_code': 500, 'bool': 'false',
                  'timestamp': datetime.datetime.now().timestamp()}
    response.data = output
    return response

def youtube(request):
    url = 'https://youtube.com/'
    if request.GET:
        if 'iPhone' in request.headers['User-Agent']:
            url = 'youtube://'
        req = request.GET['url']
        req = req.replace('https://youtube.com/', '')
        req = req.replace('https://www.youtube.com/', '')
        print(url + req)
        return Response(url + req)
    return Response('test')


def member(request, user):
    response = Response({}, content_type='application/json')
    if request.session.has_key('name'):
        output = routing_in_member(request, user)
        response.data = output
        return response
    status = json.dumps({'error': {'status_code': UNAUTHORIZED, 'type': 'auth_error'}, 'bool': 0})
    response.data = status
    response.status_code = UNAUTHORIZED
    return response

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def app(request):
    content_type = is_port_local_content_type(request)
    response = Response({'status': OK, 'bool': 'false', 'login': 'fail'}, content_type=content_type)
    if request.method == 'POST':
        response = views_app.login(request, response)
    return response


