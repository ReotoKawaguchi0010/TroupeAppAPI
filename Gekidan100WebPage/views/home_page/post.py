import json

from rest_framework.response import Response

from Gekidan100WebPage.utils.http import has_request_type


def video(request, response: Response):
    if request.session.get('video_ticket') is None:
        data = request.read().decode('utf-8')
        data = json.loads(data)
        name = data['name']
        mail_address = data['mail_address']
        payment = data['payment']
        request.session['video_ticket'] = {
            'name': name,
            'mail_address': mail_address,
            'payment': payment,
        }
        if not request.session.session_key:
            request.session.create()
            response.set_cookie('sessionid', request.session.session_key)
        response.data['payment'] = {
            'payment': payment,
            'redirect': False,
        }
        if payment == 'PayPal':
            response.data['payment'] = {
                'payment': payment,
                'redirect': True,
            }
    return response


def main(request, response: Response):
    request_data = request.body.decode('utf-8')
    request_data = json.loads(request_data)
    if has_request_type(request_data, 'video'):
        return video(request, response)
    return response
