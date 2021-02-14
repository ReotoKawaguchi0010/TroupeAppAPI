import datetime

import json

from rest_framework.response import Response
from rest_framework.decorators import api_view

from Gekidan100WebPage.utils.mail import info_send_mail, info_response_mail
from Gekidan100WebPage.utils.status_codes import UNAUTHORIZED, OK
from Gekidan100WebPage.utils.decorators.response import json_response


@api_view(['POST'])
@json_response(status=OK, bool='false')
def send_mail(request, response):
    try:
        req_body = request.body.decode(encoding='utf-8')
        req_body = json.loads(req_body)
        #info_send_mail(req_body['mailAddress'], req_body, req_body['content'])
        #info_response_mail(req_body['mailAddress'], req_body, req_body['content'])
        output = {'status_code': OK, 'bool': 'true',
                  'timestamp': datetime.datetime.now().timestamp()}
    except:
        output = {'status_code': 500, 'bool': 'false',
                  'timestamp': datetime.datetime.now().timestamp()}
    response.data = output
    return response