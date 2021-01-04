from django.db import models

from Gekidan100WebPage.models.performance.cast import Cast
from Gekidan100WebPage.models.performance.staff import Staff
from Gekidan100WebPage.models.performance.schedule import Schedule


class Peformance(models.Model):
    title = models.fields.CharField(max_length=256)
    performance_date = models.fields.CharField(max_length=256)
    cast = models.ForeignKey(Cast, on_delete=models.CASCADE)
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE)
    schedule = models.ForeignKey(Schedule, on_delete=models.CASCADE)

