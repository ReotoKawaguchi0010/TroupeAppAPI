from rest_framework.response import Response

from v1.models.user import User


def update_user(response: Response, data: dict):
    prev_data = data['prev_data']
    update_data = data['update_data']
    username = data['username']
    user_data = User().update(prev_data['username'], username=username)
    response.data = user_data
    return response