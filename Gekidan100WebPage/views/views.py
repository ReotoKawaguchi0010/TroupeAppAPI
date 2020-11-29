import json

from django.shortcuts import HttpResponse

from Gekidan100WebPage.views.personal import routing_in_member
from Gekidan100WebPage.views.menu import routing_in_menu
from Gekidan100WebPage.api import ameba_api
from Gekidan100WebPage.utils.mail import info_send_mail, info_response_mail
from Gekidan100WebPage.utils.status_codes import UNAUTHORIZED, OK
from Gekidan100WebPage.api.member_page_api import is_login_check
from Gekidan100WebPage.api.twitter_api import TwitterApi
#from Gekidan100WebPage.models.models import User
from Gekidan100WebPage.views import gets

def init_page(request):
    tweet = TwitterApi()
    news_text = ''
    about_us_text = ''
    blog_text = ameba_api.get_ameba_content()
    twitter_text = tweet.user_timeline(5)
    recruitment_text = ''
    if request.method == 'GET':
        if request.GET.get('video_ticket'):
            output = gets.video_ticket(request)
        elif request.GET.get('paymentId') and request.GET.get('PayerID'):
            output = gets.pay_out(request, request.GET.get('paymentId'), request.GET.get('PayerID'))
        else:
            output = {'request': 'init', 'message': 'message', 'texts': {'news': news_text, 'about_us': about_us_text, 'blog': blog_text,
                                          'twitter': twitter_text, 'recruitment': recruitment_text}}
        response = HttpResponse(json.dumps(output), content_type='application/json')
        response['Access-Control-Allow-Credentials'] = 'true'
        return response







def menu(request):
    output = routing_in_menu(request)
    response = HttpResponse(json.dumps(output), content_type='application/json')
    response['Access-Control-Allow-Credentials'] = 'true'
    return response

def send_mail(request):
    try:
        req_body = request.body.decode(encoding='utf-8')
        req_body = json.loads(req_body)
        print(req_body)
        info_send_mail(req_body['mailAddress'], req_body, req_body['content'])
        info_response_mail(req_body['mailAddress'], req_body, req_body['content'])
        output = {'bool': 1}
        response = HttpResponse(json.dumps(output), content_type='application/json')
        return response
    except:
        output = {'error': {'status_code': OK}, 'bool': 0}
        return HttpResponse(json.dumps(output), content_type='application/json')

def youtube(request):
    url = 'https://youtube.com/'
    if request.GET:
        if 'iPhone' in request.headers['User-Agent']:
            url = 'youtube://'
        req = request.GET['url']
        req = req.replace('https://youtube.com/', '')
        req = req.replace('https://www.youtube.com/', '')
        print(url + req)
        return HttpResponse(url + req)
    return HttpResponse('test')


def auth(request):
    if request.POST:
        username = request.POST['username']
        password = request.POST['password']
        if request.session.get('name') is None:
            if is_login_check(username, password):
                request.session['name'] = username
                if not request.session.session_key:
                    request.session.create()
                status = json.dumps({'success': {'status_code': OK}, 'bool': 1})
                response = HttpResponse(status, content_type='application/json')
                response['Access-Control-Allow-Credentials'] = 'true'
                response.set_cookie('sessionid', request.session.session_key)
                return response
        else:
            status = json.dumps({'success': {'status_code': OK}, 'bool': 1})
            print(request.session.get('name'))
            response = HttpResponse(status, content_type='application/json')
            response['Access-Control-Allow-Credentials'] = 'true'
            return response
    status = json.dumps({'error': {'status_code': UNAUTHORIZED, 'type': 'auth_error'}, 'bool': 0})
    response = HttpResponse(status, content_type='application/json', status=UNAUTHORIZED)
    response['Access-Control-Allow-Credentials'] = 'true'
    return response

def member(request, user):
    if request.session.has_key('name'):
        output = routing_in_member(request, user)
        response = HttpResponse(json.dumps(output), content_type='application/json')
        response['Access-Control-Allow-Credentials'] = 'true'
        return response
    status = json.dumps({'error': {'status_code': UNAUTHORIZED, 'type': 'auth_error'}, 'bool': 0})
    response = HttpResponse(status, content_type='application/json', status=UNAUTHORIZED)
    response['Access-Control-Allow-Credentials'] = 'true'
    return response