import json

from rest_framework.response import Response
from rest_framework.decorators import api_view

from Gekidan100WebPage.api import ameba_api
from Gekidan100WebPage.utils.util import is_port_local_content_type, has_request_type
from Gekidan100WebPage.utils.read_word import ReadWordFiles
from Gekidan100WebPage.utils.status_codes import UNAUTHORIZED, OK
from Gekidan100WebPage.api.twitter_api import TwitterApi
from Gekidan100WebPage.views import gets
from Gekidan100WebPage.views.post import post, post_performance
from Gekidan100WebPage.views.get import get, get_performance

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

@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def app(request):
    content_type = is_port_local_content_type(request)
    response = Response({'status': OK, 'bool': 'false', 'login': 'fail'}, content_type=content_type)
    if request.method == 'POST':
        request_data = ''
        if request.content_type == 'application/json':
            request_data = request.body.decode('utf-8')
            request_data = json.loads(request_data)
        else:
            print(request.POST)
            for key, value in request.FILES.items():
                if key == 'file':
                    bytes_data = value.read()
                    r = ReadWordFiles()
                    r.read_word_file(bytes_data)
                elif key == 'type':
                    print(value)

        if has_request_type(request_data, 'login'):
            response = post.login(request, response, request_data)
        elif has_request_type(request_data, 'idea'):
            response = post.idea(request, response, request_data)
        elif has_request_type(request_data, 'logout'):
            response = post.logout(request, response, request_data)
        elif has_request_type(request_data, 'crete_performance'):
            response = post_performance.post_performance(request, response, request_data)
        elif has_request_type(request_data, 'create_schedule'):
            response = post_performance.post_schedule(request, response, request_data)
    elif request.method == 'GET':
        request_data = request.GET.dict()
        if has_request_type(request_data, 'idea'):
            response = get.get_idea(request, response, request_data)
        elif has_request_type(request_data, 'performance'):
            response = get_performance.get_performance(request, response, request_data)
        elif has_request_type(request_data, 'get_schedule'):
            response = get_performance.get_schedule(request, response, request_data)
    return response




