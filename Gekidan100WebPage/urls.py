from .utils import util

from django.urls import path, include

from . import views

MEMBERURI = util.encode_sha256('gekidan100')+'/' #  2e480999f7936ed3dc505dbdf1767971cdae0214f6d6530dfd8391d6fad223f0

member = [
    path('', views.init_page, name='index'),
    path('<str:name>', views.personal_member, name='personal_member'),
    path('<str:test>/<str:test2>', views.member_page2, name='index'),
]

json = [
    path('ameba', views.ameba_json_api, name='ameba_json_api'),
    path('test', views.test_json),
]

private_member = [
    path('', views.private_member_app_login, name='private_member'),
    path('<str:name>', views.private_member_app, name='private_member_app_app'),
]


urlpatterns = [
    path('', views.init_page, name='index'),
    path('menu', views.init_page, name='menu'),
    path('overview', views.init_page, name='overview'),
    path('schedule', views.init_page, name='schedule'),
    path('ticket', views.init_page, name='ticket'),
    path('mailform', views.init_page, name='mailform'),
    path('youtube', views.youtube, name='youtube'),
    path('mail', views.send_mail, name='mail'),
    path('member/', include(member)),
    path('json/', include(json)),
    path(MEMBERURI, include(private_member)),
]

