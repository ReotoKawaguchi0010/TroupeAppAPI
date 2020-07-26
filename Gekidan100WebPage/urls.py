from .utils import util

from django.urls import path, include

from . import views

MEMBERURI = util.encode_sha256('gekidan100')+'/' #  2e480999f7936ed3dc505dbdf1767971cdae0214f6d6530dfd8391d6fad223f0

member = [
    path('', views.member_page, name='index'),
    path('<str:name>', views.personal_member, name='personal_member'),
    path('<str:test>/<str:test2>', views.member_page2, name='index'),
]

json = [
    path('ameba', views.ameba_json_api, name='ameba_json_api'),
    path('twitter', views.twitter_json_api, name='twitter_json_api'),
]

private_member = [
    path('', views.private_member, name='private_member'),
]


urlpatterns = [
    path('', views.init_page, name='index'),
    path('overview', views.overview_page, name='overview'),
    path('member/', include(member)),
    path('schedule', views.schedule_page, name='schedule'),
    path('ticket', views.ticket_page, name='ticket'),
    path('mailform', views.mailform_page, name='mailform'),
    path('json/', include(json)),
    path(MEMBERURI, include(private_member)),
]

