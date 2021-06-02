from v1.views.app.delete.delete_performance import delete_idea, delete_script
from v1.utils.util import has_request_type


def main(request, response):
    request_data = request.GET.dict()
    if has_request_type(request_data, 'delete_idea'):
        response = delete_idea(request, response, request_data)
    elif has_request_type(request_data, 'delete_script'):
        response = delete_script(request, response, request_data)
    return response