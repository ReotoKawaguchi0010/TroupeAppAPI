import datetime
import json

from django.contrib.auth.models import User
from rest_framework.response import Response

from Gekidan100WebPage.models.models import Idea, IdeaContents
from Gekidan100WebPage.models.user import UserData
from Gekidan100WebPage.utils.status_codes import UNAUTHORIZED, OK
from Gekidan100WebPage.utils.util import time_subtraction



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
                    response.data = {'status': OK, 'bool': 'true', 'login': 'success', 'user': {
                        'username': user_data.user.username,
                        'first_name': user_data.user.first_name,
                        'last_name': user_data.user.last_name,
                        'email': user_data.user.email,
                        'introduction': user_data.introduction,
                        'profile_image': user_data.profile_image,
                        'contract': user_data.contract,
                    }}
    else:
        user_data = request.session.get('user')
        response.data = {'status': OK, 'bool': 'true', 'login': 'success', 'user': {
                            'username': user_data.user.username,
                            'first_name': user_data.user.first_name,
                            'last_name': user_data.user.last_name,
                            'email': user_data.user.email,
                            'introduction': user_data.introduction,
                            'profile_image': user_data.profile_image,
                            'contract': user_data.contract,
        }}
        if time_subtraction(request.session.get('time')) > 8000:
            request.session.delete('user')
            request.session.delete('username')
            request.session.delete('time')
            response.delete_cookie('sessionid')
            response.data = {'status': OK, 'bool': 'false', 'login': 'fail'}
    return response

def logout(request, response: Response, data: dict):
    if not request.session.is_empty():
        request.session.delete('user')
        request.session.delete('username')
        request.session.delete('time')
        response.delete_cookie('sessionid')
    return response


def idea(request, response: Response, data: dict):
    data.pop('type')
    title = ''
    author = ''
    in_idea_contents_data = {}
    for i, v in data.items():
        if v['name'] == 'タイトル':
            title = v['value']
        elif v['name'] == '作成者':
            author = v['value']
        else:
            in_idea_contents_data = {i: v}
    idea_data = Idea.objects.select_related().filter(title=title)
    if not bool(idea_data):
        idea = Idea(title=title, author=author)
        idea.save()
    for i in idea_data:
        idea_data = i
    if bool(in_idea_contents_data):
        for _, v in in_idea_contents_data.items():
            idea_contents_data = IdeaContents.objects.filter(name=v['name'])
            if not bool(idea_contents_data):
                idea_contents = IdeaContents(name=v['name'], value=v['value'], idea_id=idea_data)
                idea_contents.save()
    return response
