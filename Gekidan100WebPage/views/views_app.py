import datetime
import json

from django.contrib.auth.models import User
from rest_framework.response import Response

from Gekidan100WebPage.utils.status_codes import UNAUTHORIZED, OK
from Gekidan100WebPage.utils.util import time_subtraction



def login(request, response: Response):
    request_data = request.body.decode('utf-8')
    request_data = json.loads(request_data)
    if request.session.get('username') is None and request.session.get('time') is None:
        if 'username' in request_data and 'password' in request_data:
            username = request_data['username']
            password = request_data['password']
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


