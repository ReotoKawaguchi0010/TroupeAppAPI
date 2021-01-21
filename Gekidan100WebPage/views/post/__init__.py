import json

from Gekidan100WebPage.views.post import post, post_performance, post_file
from Gekidan100WebPage.utils.util import has_request_type


def post_word_file(request, response):

    return response

def has_post_key(request, key):
    post_keys = dict(request.POST).keys()
    for post_key in post_keys:
        if post_key == key:
            return True
    return False



def main(request, response):
    request_data = ''
    if request.content_type == 'application/json':
        request_data = request.body.decode('utf-8')
        request_data = json.loads(request_data)
    else:
        if has_post_key(request, 'type'):
            request_data = {'type': request.POST['type'], 'files': request.FILES}

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
    elif has_request_type(request_data, 'upload_script'):
        response = post_file.main(request, response, request_data)
    return response