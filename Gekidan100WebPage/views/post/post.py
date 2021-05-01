import datetime
import json

from django.contrib.auth.models import User
from rest_framework.response import Response

from Gekidan100WebPage.models.models import Idea, IdeaContents
from Gekidan100WebPage.models.user import UserData
from Gekidan100WebPage.utils.status_codes import UNAUTHORIZED, OK
from Gekidan100WebPage.utils.util import time_subtraction


def session_time_out(request, response):

    request.session.delete('user')
    request.session.delete('username')
    request.session.delete('time')
    response.delete_cookie('sessionid')
    response.data = {'status': OK, 'bool': False, 'login': 'fail'}
    return response

def login(request, response: Response, data: dict):
    if request.session.get('username') is None and request.session.get('time') is None:
        if 'username' in data and 'password' in data:
            username = data['username']
            password = data['password']
            if User.objects.filter(username=username).exists():
                user = User.objects.get(username=username)
                user_data = UserData.objects.get(user=user)
                if user_data is not None and user_data.user.check_password(password):
                    request.session['user'] = user_data
                    request.session['username'] = username
                    request.session['time'] = datetime.datetime.now()
                    if not request.session.session_key:
                        request.session.create()
                    response.set_cookie('sessionid', request.session.session_key)
                    response.data = {
                        'status': OK, 'bool': True, 'login': 'success',
                        'user': {
                            'username': user_data.user.username,
                            'first_name': user_data.user.first_name,
                            'last_name': user_data.user.last_name,
                            'email': user_data.user.email,
                            'introduction': user_data.introduction,
                            'profile_image': user_data.profile_image,
                            'contract': user_data.contract,
                        }
                    }
    else:
        if time_subtraction(request.session.get('time')) > 8000:
            session_time_out(request, response)
        user_data = request.session.get('user')
        response.data = {
            'status': OK, 'bool': True, 'login': 'success',
            'user': {
                'username': user_data.user.username,
                'first_name': user_data.user.first_name,
                'last_name': user_data.user.last_name,
                'email': user_data.user.email,
                'introduction': user_data.introduction,
                'profile_image': user_data.profile_image,
                'contract': user_data.contract,
            }
        }
    return response

def logout(request, response: Response, data: dict):
    if not request.session.is_empty():
        request.session.delete('user')
        request.session.delete('username')
        request.session.delete('time')
        response.delete_cookie('sessionid')
    return response


def idea(request, response: Response, data: dict):
    if data['author'] != '':
        title = ''
        author = data['author']
        in_idea_contents_data = {}
        for i in range(len(data['itemValues'])):
            if data['itemValues'][i]['name'] == 'タイトル':
                title = data['itemValues'][i]['value']
            else:
                in_idea_contents_data = {i: data['itemValues'][i]}
        idea_contents = IdeaContents()
        idea_contents.create(title=title, author=author, values=in_idea_contents_data)
    return response
