from django.db import models

from Gekidan100WebPage.models.performance.performance import Peformance
from Gekidan100WebPage.models.performance.script import Script

class PerformanceScript(models.Model):
    performance = models.ForeignKey(Peformance, on_delete=models.CASCADE)
    script = models.ForeignKey(Script, on_delete=models.CASCADE)