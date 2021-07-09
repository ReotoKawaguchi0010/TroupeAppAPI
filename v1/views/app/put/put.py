from rest_framework.response import Response

from v1.models.user import User
from v1.models.performance_video_list import PerformanceVideoList
from v1.views.session.app.user import SessionUserAdminWebApp


def update_user(request, response: Response, data: dict):
    prev_data = data['prev_data']
    update_data = data['update_data']
    first_name = update_data['first_name']
    last_name = update_data['last_name']
    email = update_data['email']
    introduction = update_data['introduction']
    user_data = User().update(prev_data['username'], first_name=first_name,
                              last_nane=last_name, email=email, introduction=introduction)
    session = SessionUserAdminWebApp(request=request, response=response, user_data=user_data)
    response = session.create_session()
    return response


def update_performance_list(response: Response, data: dict):
    if 'update_data' in data:
        performance_num = data['update_data']['performance_num']
        item_name = data['update_data']['item_name']
        top_image = data['update_data']['top_image']
        release_date = data['update_data']['release_date']
        price = data['update_data']['price']
        payment_methods = data['update_data']['payment_methods']
        synopsis = data['update_data']['synopsis']
        images = data['update_data']['images']
        response.data = PerformanceVideoList().update(performance_num=performance_num, item_name=item_name,
                                                      top_image=top_image, release_date=release_date, price=price,
                                                      payment_methods=payment_methods, synopsis=synopsis, images=images)
    return response
