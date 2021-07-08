import json

from rest_framework.response import Response

from v1.views.app.put import put
from v1.utils import has_request_type


def main(request, response: Response):
    request_data = ''
    if request.content_type == 'application/json':
        request_data = request.body.decode('utf-8')
        request_data = json.loads(request_data)
    if has_request_type(request_data, 'update_user'):
        response = put.update_user(request, response, request_data)
    return response