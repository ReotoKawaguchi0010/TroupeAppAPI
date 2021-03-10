from django.db import models

from Gekidan100WebPage.models.performance.full_budget import FullBudget
from Gekidan100WebPage.models.user import UserData


class Budget(models.Model):

    item = models.TextField()
    price = models.IntegerField()
    user = models.ForeignKey(UserData, on_delete=models.CASCADE, null=True)
    full_budget = models.ForeignKey(FullBudget, on_delete=models.CASCADE)


    def create(self, performance_id, full_budget, username):
        full_budget = int(full_budget)
        full_budget_obj = FullBudget.objects.filter(performance_id=performance_id, full_budget=full_budget)
        if not full_budget_obj.exists():
            full_budget = FullBudget(performance_id=performance_id, full_budget=full_budget)
            full_budget.save()
        self.full_budget = full_budget
        self.user = UserData.objects.filter(username=username).get()
        self.save()
        return False

    def read(self, performance_id):
        full_budget = FullBudget.objects.filter(performance_id=performance_id)
        return full_budget