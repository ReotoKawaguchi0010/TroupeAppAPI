from django.urls import path, include

from Gekidan100WebPage.views import views, mail

app = [
    path('', views.app),
]

urlpatterns = [
    path('', views.init_page),
    path('mail', mail.send_mail),
    path('app/', include(app)),
]


