from rest_framework.response import Response

from v1.models.user import User


def update_user(response: Response, data: dict):
    prev_data = data['prev_data']
    update_data = data['update_data']
    first_name = update_data['first_name']
    last_name = update_data['last_name']
    email = update_data['email']
    introduction = update_data['introduction']
    user_data = User().update(prev_data['username'], first_name=first_name,
                              last_nane=last_name, email=email, introduction=introduction)
    response.data = user_data
    return response
