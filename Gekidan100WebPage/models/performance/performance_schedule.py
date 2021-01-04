from django.db import models

from Gekidan100WebPage.models.performance.performance import Peformance
from Gekidan100WebPage.models.performance.schedule import Schedule

class Performance_Schedule(models.Model):
    performance = models.ForeignKey(Peformance, on_delete=models.CASCADE)
    schedule = models.ForeignKey(Schedule, on_delete=models.CASCADE, null=True)