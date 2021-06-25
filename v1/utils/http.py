def is_port_local_content_type(request):
    if int(request.get_port()) == 8000:
        return 'text/html'
    return 'application/json'


def has_request_type(request_data, has_data):
    if 'type' in request_data:
        request_type = request_data['type']
        return has_data in request_type
    return False


def has_get_type(request, *params):
    for i in params:
        if request.GET.get(i) is None:
            return False
    return True


def has_post_key(request, key):
    post_keys = dict(request.POST).keys()
    for post_key in post_keys:
        if post_key == key:
            return True
    return False
