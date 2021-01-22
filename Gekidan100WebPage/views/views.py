import json

from rest_framework.decorators import api_view

from Gekidan100WebPage.api import ameba_api
from Gekidan100WebPage.utils.decorators.response import json_response
from Gekidan100WebPage.utils.status_codes import UNAUTHORIZED, OK
from Gekidan100WebPage.api.twitter_api import TwitterApi
from Gekidan100WebPage.views import gets
from Gekidan100WebPage.views import post, get, put, delete

@api_view(['GET', 'POST'])
@json_response(status=OK, bool='false', login='fail')
def init_page(request, response):
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
@json_response(status=OK, bool='false', login='fail')
def app(request, response):
    if request.method == 'POST':
        response = post.main(request, response)
    elif request.method == 'GET':
        response = get.main(request, response)
    elif request.method == 'PUT':
        response = put.main(request, response)
    elif request.method == 'DELETE':
        response = delete.main(request, response)
    return response




