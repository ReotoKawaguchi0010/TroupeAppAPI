from rest_framework.decorators import api_view

from Gekidan100WebPage.utils.decorators.response import json_response
from Gekidan100WebPage.utils.status_codes import OK
from Gekidan100WebPage.views.home_page import home_page
from Gekidan100WebPage.views.home_page.post import video

from Gekidan100WebPage.views import post, get, put, delete

@api_view(['GET', 'POST'])
@json_response(status=OK, bool='false', login='fail')
def init_page(request, response):
    if request.method == 'GET':
        response = home_page.main(request, response)
    elif request.method == 'POST':
        response = video(request, response)
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




