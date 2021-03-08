from django.db import models

from Gekidan100WebPage.models.performance.full_budget import FullBudget


class Budget(models.Model):

    item = models.TextField()
    price = models.IntegerField()
    full_budget = models.ForeignKey(FullBudget, on_delete=models.CASCADE)


    def create(self, performance_id, full_budget):
        full_budget = int(full_budget)
        full_budget_obj = FullBudget.objects.filter(performance_id=performance_id, full_budget=full_budget)
        if not full_budget_obj.exists():
            full_budget = FullBudget(performance_id=performance_id, full_budget=full_budget)
            full_budget.save()
        return False

    def read(self, performance_id):
        full_budget = FullBudget.objects.filter(performance_id=performance_id)
        return full_budget