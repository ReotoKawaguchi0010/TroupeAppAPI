import datetime
import json

from django.contrib.auth.models import User
from rest_framework.response import Response

from Gekidan100WebPage.models.models import Idea, IdeaContents
from Gekidan100WebPage.utils.status_codes import UNAUTHORIZED, OK
from Gekidan100WebPage.utils.util import time_subtraction



def login(request, response: Response, data: dict):
    if request.session.get('username') is None and request.session.get('time') is None:
        if 'username' in data and 'password' in data:
            username = data['username']
            password = data['password']
            if User.objects.filter(username=username).exists():
                user = User.objects.get(username=username)
                if user is not None and user.check_password(password):
                    request.session['username'] = username
                    request.session['time'] = datetime.datetime.now()
                    if not request.session.session_key:
                        request.session.create()
                    response.set_cookie('sessionid', request.session.session_key)
                    response.data = {'status': OK, 'bool': 'true', 'login': 'success'}
    else:
        response.data = {'status': OK, 'bool': 'true', 'login': 'success'}
        if time_subtraction(request.session.get('time')) > 8000:
            request.session.delete('username')
            request.session.delete('time')
            response.delete_cookie('sessionid')
            response.data = {'status': OK, 'bool': 'false', 'login': 'fail'}
    return response

def idea(request, response: Response, data: dict):
    data.pop('type')
    title = ''
    author = ''
    for _, v in data.items():
        if v['name'] == 'タイトル':
            title = v['value']
        elif v['name'] == '作成者':
            author = v['value']
    idea_data = Idea.objects.filter(title=title)
    if not bool(idea_data):
        idea = Idea(title=title, author=author)
        idea.save()
    else:
        idea_id = 0
        for v in idea_data:
            idea_id = v.id
        print(idea_id)
    return response
