from v1.views.app.get import get
from v1.views.app.get import get_performance
from v1.utils.util import has_request_type


def main(request, response):
    request_data = request.GET.dict()
    if has_request_type(request_data, 'idea'):
        response = get.get_idea(request, response, request_data)
    elif has_request_type(request_data, 'get_user_data'):
        response = get.get_user_data(request, response, request_data)
    elif has_request_type(request_data, 'get_performance'):
        response = get_performance.get_performance(request, response, request_data)
    elif has_request_type(request_data, 'get_schedule'):
        response = get_performance.get_schedule(response, request_data)
    elif has_request_type(request_data, 'get_script'):
        response = get_performance.get_script(request, response, request_data)
    elif has_request_type(request_data, 'get_budget'):
        response = get_performance.get_budget(request, response, request_data)
    elif has_request_type(request_data, 'get_users'):
        response = get_performance.get_users(request, response, request_data)
    elif has_request_type(request_data, 'get_purchased_video_ticket_user'):
        response = get.get_purchased_video_ticket_user(request, response, request_data)
    elif has_request_type(request_data, 'get_sale'):
        response = get.get_sale(response, request_data)
    return response
