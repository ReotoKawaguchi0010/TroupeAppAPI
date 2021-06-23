import json

from django.http.request import HttpRequest
from rest_framework.response import Response

from v1.views.app.post import post_performance
from v1.views.app.post import post
from v1.views.app.post import post_file
from v1.utils.util import has_request_type


def has_post_key(request, key):
    post_keys = dict(request.POST).keys()
    for post_key in post_keys:
        if post_key == key:
            return True
    return False


def main(request: HttpRequest, response: Response):
    request_data = ''
    if request.content_type == 'application/json':
        request_data = request.body.decode('utf-8')
        request_data = json.loads(request_data)
    else:
        if has_post_key(request, 'type') and has_post_key(request, 'performanceID'):
            request_data = {'type': request.POST['type'], 'files': request.FILES,
                            'performanceID': request.POST['performanceID']}
    if has_request_type(request_data, 'login'):
        response = post.login(request, response, request_data)
    elif has_request_type(request_data, 'idea'):
        response = post.idea(response, request_data)
    elif has_request_type(request_data, 'logout'):
        response = post.logout(request, response)
    elif has_request_type(request_data, 'crete_performance'):
        response = post_performance.post_performance(response, request_data)
    elif has_request_type(request_data, 'create_schedule'):
        response = post_performance.post_schedule(response, request_data)
    elif has_request_type(request_data, 'upload_script'):
        response = post_file.main(response, request_data)
    elif has_request_type(request_data, 'create_budget'):
        response = post_performance.post_budget(response, request_data)
    elif has_request_type(request_data, 'video_ticket_permit'):
        response = post.video_ticket_permit(request, response, request_data)
    elif has_request_type(request_data, 'create_sale'):
        response = post_performance.post_sale(response, request_data)
    return response
