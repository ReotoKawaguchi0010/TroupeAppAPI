from rest_framework.response import Response

from Gekidan100WebPage.models.models import Idea, IdeaContents
from Gekidan100WebPage.models.video_ticket import VideoTicket
from Gekidan100WebPage.views.session.app.user import SessionUserAdminWebApp


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
        'performance_video_list_num': video_ticket.performance_video_list_num.item_name
    } for video_ticket in video_tickets]
    response.data = ticket
    return response