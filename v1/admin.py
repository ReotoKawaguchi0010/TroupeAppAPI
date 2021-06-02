from django.contrib import admin

from v1.models.user import UserData
from v1.models.performance import PerformanceScript
from v1.models.video_ticket import VideoTicket
from v1.models.performance_video_list import PerformanceVideoList

admin.site.register(UserData)
admin.site.register(PerformanceScript)
admin.site.register(VideoTicket)
admin.site.register(PerformanceVideoList)
