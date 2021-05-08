from django.urls import path, include

from Gekidan100WebPage.views import views, mail

app = [
    path('', views.app_view),
]

urlpatterns = [
    path('', views.web_view),
    path('mail', mail.send_mail),
    path('app/', include(app)),
]


