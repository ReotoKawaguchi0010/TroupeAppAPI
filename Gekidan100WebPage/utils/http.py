
def is_port_local_content_type(request):
    if int(request.get_port()) == 8000:
        return 'text/html'
    return 'application/json'

def has_request_type(request_data, has_data):
    if 'type' in request_data:
        request_type = request_data['type']
        return has_data in request_type
    return False

def has_get_type(request, *has_data):
    result_bool = False
    for i in has_data:
        if request.GET.get(i) is None:
            result_bool = False
            break
        result_bool = True
    return result_bool
