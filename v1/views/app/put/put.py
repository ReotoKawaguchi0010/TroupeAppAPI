from rest_framework.response import Response

from v1.models.user import UserData


def update_user(response: Response, data: dict):
    prev_data = data['prev_data']
    update_data = data['update_data']
    user_data = UserData().update(prev_data['username'], username=update_data['username'])
    response.data = user_data
    return response