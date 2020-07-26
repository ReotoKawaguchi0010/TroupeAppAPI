from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('Gekidan100WebPage.urls')),
    path('admin/', admin.site.urls),
]
