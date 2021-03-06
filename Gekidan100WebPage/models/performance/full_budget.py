from django.db import models

from Gekidan100WebPage.models.performance.performance import Peformance


class FullBudget(models.Model):

    full_budget = models.fields.IntegerField()
    performance = models.ForeignKey(Peformance, on_delete=models.CASCADE)





