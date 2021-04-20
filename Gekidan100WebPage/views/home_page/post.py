import json

from rest_framework.response import Response


def video(request, response: Response):
    if request.session.get('video_ticket') is None:
        data = request.read().decode('utf-8')
        data = json.loads(data)
        print(data)
        request.session['video_ticket'] = {
            'name': data['name'],
            'mail_address': data['mail_address'],
            'payment': data['payment'],
        }
    return response





