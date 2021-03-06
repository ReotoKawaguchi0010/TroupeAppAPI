from rest_framework.response import Response

from v1.models.models import IdeaContents
from v1.models.user import User
from v1.models.video_ticket import VideoTicket
from v1.views.session.app.user import SessionUserAdminWebApp


def login(request, response: Response, data: dict):
    if 'send_data' in data:
        data = data['send_data']
        if 'username' in data and 'password' in data:
            user_data = User().login(data['username'], data['password'])
            session = SessionUserAdminWebApp(request=request, response=response, user_data=user_data)
            response = session.create_session()
    return response


def logout(request, response: Response):
    if not request.session.is_empty():
        request.session.delete('user')
        request.session.delete('username')
        request.session.delete('time')
        response.delete_cookie('sessionid')
        response.data = {
            'run': True,
            'to': '/app/login'
        }
    return response


def idea(response: Response, data: dict):
    if data['author'] != '':
        title = ''
        author = data['author']
        in_idea_contents_data = {}
        for i in range(len(data['item_values'])):
            if data['item_values'][i]['name'] == 'タイトル':
                title = data['item_values'][i]['value']
            else:
                in_idea_contents_data = {i: data['item_values'][i]}
        idea_contents = IdeaContents()
        idea_contents.create(title=title, author=author, values=in_idea_contents_data)
        response.data = idea_contents.dict()
    return response


def video_ticket_permit(request, response: Response, data: dict):
    session = SessionUserAdminWebApp(request=request, response=response)
    if session.is_superuser() and 'send_data' in data:
        VideoTicket().permit_change(data['send_data'])
        response.data = {'status': '200', 'change_permit': 'success'}
    return response


def create_user(response: Response, data: dict):
    user = User()
    if 'send_data' in data:
        response.data = user.trial(data['send_data'])
    return response
