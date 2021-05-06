import json
import pickle

from django.http.request import HttpRequest
from rest_framework.response import Response


class SessionAdminWebPage(object):

    def __init__(self, request: HttpRequest, response: Response):
        self.request = request
        self.data: dict = self.get_request_data(request)
        self.response: Response = response
        self.session_name = ''

    @staticmethod
    def dict_serialize(data: dict):
        return pickle.dumps(data)

    @staticmethod
    def dict_unserialize(data):
        return pickle.loads(data)

    @staticmethod
    def get_request_data(request):
        if request.method == 'POST' and request.content_type == 'application/json':
            json_data = request.body.decode('utf-8')
            return json.loads(json_data)
        return {}

    def create_session_key(self):
        if self.request.session.session_key is not None:
            self.request.session.create()
            self.response.set_cookie('sessionid', self.request.session.session_key)

    def create_session(self):
        if self.session_name in self.request.session.keys():
            return self.response
        self.request.session[self.session_name] = self.dict_serialize(self.data)
        self.create_session_key()
        return self.response
