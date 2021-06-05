from django.db import models

from v1.models.performance.cast import Cast
from v1.models.performance.staff import Staff


class Peformance(models.Model):
    title = models.fields.CharField(max_length=256)
    performance_date = models.fields.DateTimeField(max_length=256, null=True)
    cast = models.ForeignKey(Cast, on_delete=models.CASCADE, null=True)
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE, null=True)

    def read(self):
        exists = self.__class__.objects.filter(id=self.id).exists()
        if exists:
            performance = self.__class__.objects.filter(id=self.id)
            return performance
        return None
