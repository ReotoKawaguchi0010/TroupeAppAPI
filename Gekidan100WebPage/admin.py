from django.contrib import admin

from Gekidan100WebPage.models.user import UserData
from Gekidan100WebPage.models.performance import PerformanceScript
from Gekidan100WebPage.models.video_ticket import VideoTicket
from Gekidan100WebPage.models.performance_video_list import PerformanceVideoList

admin.site.register(UserData)
admin.site.register(PerformanceScript)
admin.site.register(VideoTicket)
admin.site.register(PerformanceVideoList)
