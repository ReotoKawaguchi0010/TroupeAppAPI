from django.contrib import admin

from Gekidan100WebPage.models.user import UserData
from Gekidan100WebPage.models.performance import PerformanceScript, Peformance, Script
# Register your models here.

admin.site.register(UserData)
admin.site.register(PerformanceScript)
admin.site.register(Peformance)
admin.site.register(Script)
