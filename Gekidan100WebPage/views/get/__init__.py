from Gekidan100WebPage.views.get import get, get_performance
from Gekidan100WebPage.utils.util import has_request_type





def main(request, response):
    request_data = request.GET.dict()
    if has_request_type(request_data, 'idea'):
        response = get.get_idea(request, response, request_data)
    elif has_request_type(request_data, 'performance'):
        response = get_performance.get_performance(request, response, request_data)
    elif has_request_type(request_data, 'get_schedule'):
        response = get_performance.get_schedule(request, response, request_data)
    return response