from django.contrib import admin

from Gekidan100WebPage.models.user import UserData
from Gekidan100WebPage.models.performance import PerformanceScript, Peformance
from Gekidan100WebPage.models.video_ticket import VideoTicket

admin.site.register(UserData)
admin.site.register(PerformanceScript)
admin.site.register(VideoTicket)
