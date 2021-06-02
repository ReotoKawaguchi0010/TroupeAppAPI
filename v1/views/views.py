from rest_framework.decorators import api_view

from v1.utils.decorators.response import json_response
from v1.utils.status_codes import OK

from v1.views import web
from v1.views import app


@api_view(['GET', 'POST'])
@json_response(status=OK, bool='false', login='fail')
def web_view(request, response):
    if request.method == 'GET':
        response = web.get.main(request, response)
    elif request.method == 'POST':
        response = web.post.main(request, response)
    return response


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
@json_response(status=OK, bool='false', login='fail')
def app_view(request, response):
    if request.method == 'POST':
        response = app.post.main(request, response)
    elif request.method == 'GET':
        response = app.get.main(request, response)
    elif request.method == 'PUT':
        response = app.put.main(request, response)
    elif request.method == 'DELETE':
        response = app.delete.main(request, response)
    return response
