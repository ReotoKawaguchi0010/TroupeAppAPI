from django.db import models

from v1.models.performance.performance import Peformance
from v1.models.performance.schedule import Schedule

class PerformanceSchedule(models.Model):
    performance = models.ForeignKey(Peformance, on_delete=models.CASCADE)
    schedule = models.ForeignKey(Schedule, on_delete=models.CASCADE, null=True)