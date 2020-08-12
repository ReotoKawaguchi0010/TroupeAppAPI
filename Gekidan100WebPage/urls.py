from django.urls import path, include

from . import views

json = [

]

urlpatterns = [
    path('', views.init_page, name='index'),
    path('overview', views.init_page, name='overview'),
    path('schedule', views.init_page, name='schedule'),
    path('ticket', views.init_page, name='ticket'),
    path('youtube', views.youtube, name='youtube'),
    path('mail', views.send_mail, name='mail'),
    path('ameba', views.ameba_json_api, name='ameba_json_api'),
    path('json/', include(json)),
]

