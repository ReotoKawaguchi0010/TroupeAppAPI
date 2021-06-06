import json

from rest_framework.response import Response
from rest_framework.decorators import api_view

from v1.models.mail import AutoContactMail
from v1.utils.status_codes import OK
from v1.utils.decorators.response import json_response


@api_view(['POST'])
@json_response(status=OK, bool='false')
def send_mail(request, response: Response):
    req_body = request.body.decode(encoding='utf-8')
    req_body = json.loads(req_body)
    first_name = req_body['first_name'] if 'first_name' in req_body else None
    second_name = req_body['second_name'] if 'second_name' in req_body else None
    first_phonetic = req_body['first_phonetic'] if 'first_phonetic' in req_body else None
    second_phonetic = req_body['second_phonetic'] if 'second_phonetic' in req_body else None
    mail_address = req_body['mail_address'] if 'mail_address' in req_body else None
    address = req_body['address'] if 'address' in req_body else None
    cities = req_body['cities'] if 'cities' in req_body else None
    house_number = req_body['house_number'] if 'house_number' in req_body else None
    profession = req_body['profession'] if 'profession' in req_body else None
    text_area = req_body['text_area'] if 'text_area' in req_body else None
    auto_contact_mail = AutoContactMail(first_name=first_name, second_name=second_name,
                                        first_phonetic=first_phonetic, second_phonetic=second_phonetic,
                                        mail_address=mail_address, address=address,
                                        cities=cities, house_number=house_number,
                                        profession=profession, text_area=text_area)
    response.data = auto_contact_mail.send()
    return response