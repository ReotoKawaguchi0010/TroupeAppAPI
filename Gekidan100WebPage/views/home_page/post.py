import json

from rest_framework.response import Response




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





