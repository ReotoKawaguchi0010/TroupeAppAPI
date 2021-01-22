from django.db import models

from Gekidan100WebPage.models.performance.cast import Cast
from Gekidan100WebPage.models.performance.staff import Staff

class Peformance(models.Model):
    title = models.fields.CharField(max_length=256)
    performance_date = models.fields.CharField(max_length=256, null=True)
    cast = models.ForeignKey(Cast, on_delete=models.CASCADE, null=True)
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE, null=True)