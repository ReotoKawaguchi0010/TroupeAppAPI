from django.urls import path, include

from Gekidan100WebPage.views import views

app = [
    path('', views.app),
]

urlpatterns = [
    path('', views.init_page),
    path('mail', views.send_mail),
    path('app/', include(app)),
]


