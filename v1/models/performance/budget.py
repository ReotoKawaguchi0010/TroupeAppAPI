from django.db import models

from v1.models.performance.full_budget import FullBudget
from v1.models.user import User


class Budget(models.Model):
    item = models.TextField()
    price = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    full_budget = models.ForeignKey(FullBudget, on_delete=models.CASCADE)

    def get_user(self, username):
        user = User.objects.filter(username=username)
        if user.exists():
            self.user = User.objects.get(user_id=user.get().id)
        return None

    def create(self, performance_id, full_budget, username):
        full_budget = int(full_budget)
        full_budget_obj = FullBudget.objects.filter(performance_id=performance_id, full_budget=full_budget)
        if not full_budget_obj.exists():
            full_budget = FullBudget(performance_id=performance_id, full_budget=full_budget)
            full_budget.save()
            return True
        self.full_budget = full_budget_obj.get()
        self.get_user(username)
        if self.price != '' and self.item != '':
            self.save()
        return False

    def read(self, performance_id):
        budgets = self.__class__.objects.filter(full_budget__performance_id=performance_id)
        total_price = 0
        item_price = []
        for budget in budgets:
            total_price += budget.price
            item_price.append({'item': budget.item, 'price': budget.price})
        return item_price
