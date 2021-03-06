from rest_framework.response import Response

from v1.models.models import Idea
from v1.models.models import IdeaContents
from v1.models.video_ticket import VideoTicket
from v1.models.performance_video_list import PerformanceVideoList
from v1.views.session.app.user import SessionUserAdminWebApp


def get_idea(request, response: Response, data: dict):
    all_idea_data = Idea.objects.all()
    response_data = []
    for idea_data in all_idea_data:
        idea_content_data = IdeaContents.objects.filter(idea_id=idea_data)
        contents = []
        if bool(idea_content_data):
            for content in idea_content_data:
                contents.append({
                    'name': content.name,
                    'value': content.value,
                })
        idea_data = {
            'title': idea_data.title,
            'author': idea_data.author,
            'contents': contents,
        }
        response_data.append(idea_data)
    response.data = response_data
    return response


def get_user_data(request, response: Response, data: dict):
    user_data = SessionUserAdminWebApp(request=request, response=response)
    response.data = {
        'status': 300,
        'run': True,
        'to': '/app/login',
    }
    if user_data.is_login():
        response.data = user_data.get_session(data['url'])
    return response


def get_purchased_video_ticket_user(request, response: Response, data: dict):
    video_tickets = VideoTicket().read_all()
    ticket = [{
        'name': video_ticket.name,
        'kana_name': video_ticket.kana_name,
        'permit': video_ticket.permit,
        'performance_video_list_num': video_ticket.performance_video_list_num.item_name,
        'video_ticket_num': video_ticket.id,
    } for video_ticket in video_tickets]
    response.data = ticket
    return response


def get_sale(response: Response, data: dict):
    sale_list = []
    if 'get' in data:
        if data['get'] == 'all':
            sale_list = PerformanceVideoList().read_all()
        else:
            sale_list = PerformanceVideoList().read(performance_num=data['get'])
    if isinstance(sale_list, list):
        response.data = sale_list
    else:
        response.data = sale_list
    return response
