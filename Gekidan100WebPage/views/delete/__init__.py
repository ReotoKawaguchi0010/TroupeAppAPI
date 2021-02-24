from Gekidan100WebPage.views.delete.delete_performance import delete_idea
from Gekidan100WebPage.utils.util import has_request_type


def main(request, response):
    request_data = request.GET.dict()
    if has_request_type(request_data, 'delete_idea'):
        response = delete_idea(request, response, request_data)
    return response