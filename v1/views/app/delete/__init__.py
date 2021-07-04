from v1.views.app.delete import delete_performance
from v1.utils.util import has_request_type


def main(request, response):
    request_data = request.GET.dict()
    if has_request_type(request_data, 'delete_idea'):
        response = delete_performance.delete_idea(response, request_data)
    elif has_request_type(request_data, 'delete_script'):
        response = delete_performance.delete_script(response, request_data)
    elif has_request_type(request_data, 'delete_performance'):
        response = delete_performance.delete_performance(response, request_data)
    return response