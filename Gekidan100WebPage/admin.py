from django.contrib import admin

from Gekidan100WebPage.models.user import UserData
from Gekidan100WebPage.models.performance import PerformanceScript, Peformance, Script
from Gekidan100WebPage.models.models import VideoTicket

admin.site.register(UserData)
admin.site.register(PerformanceScript)
admin.site.register(Peformance)
admin.site.register(Script)
admin.site.register(VideoTicket)
