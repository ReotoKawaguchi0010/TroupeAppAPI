from django.db import models

from Gekidan100WebPage.models.performance.full_budget import FullBudget
from Gekidan100WebPage.models.user import UserData, User


class Budget(models.Model):

    item = models.TextField()
    price = models.IntegerField()
    user = models.ForeignKey(UserData, on_delete=models.CASCADE, null=True)
    full_budget = models.ForeignKey(FullBudget, on_delete=models.CASCADE)

    def get_user(self, username):
        user = User.objects.filter(username=username)
        if user.exists():
            self.user = UserData.objects.get(user_id=user.get().id)
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
        full_budget = FullBudget.objects.filter(performance_id=performance_id)
        return full_budget