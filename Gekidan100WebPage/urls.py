from django.urls import path, include

from Gekidan100WebPage.views import views

member_page = [
    path('', views.member),
]

member = [
    path('', views.auth, name='auth'),
    path('<str:user>/', include(member_page)),
]

urlpatterns = [
    path('', views.init_page, name='index'),
    path('mail', views.send_mail, name='mail'),
    path('auth/', include(member)),
]


