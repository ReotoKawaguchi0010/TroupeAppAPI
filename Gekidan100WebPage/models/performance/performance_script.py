import pickle
import math
from django.db import models

from Gekidan100WebPage.models.performance.performance import Peformance
from Gekidan100WebPage.models.performance.script import Script

class PerformanceScript(models.Model):
    BUFFER_SIZE = 34

    performance = models.ForeignKey(Peformance, on_delete=models.CASCADE)
    script = models.ForeignKey(Script, on_delete=models.CASCADE)

    def get_script(self, performance_id, script_num):
        if self.performance.objects.filter(id=performance_id).exists():
            performance = self.performance.objects.get(id=performance_id)
            print(performance)
            if self.objects.filter(performance=performance).exists():
                performance_script = self.objects.get(performance=performance)
                script = performance_script.script
                script = pickle.loads(script)
                return script[0:self.BUFFER_SIZE]
        return False


def models_get_script(performance_id, script_num):
    if Peformance.objects.filter(id=performance_id).exists():
        performance = Peformance.objects.get(id=performance_id)
        if PerformanceScript.objects.filter(performance=performance).exists():
            performance_script = PerformanceScript.objects.get(performance=performance)
            script = performance_script.script
            script = pickle.loads(script.script)
            total_page_num = math.ceil(len(script) / PerformanceScript.BUFFER_SIZE)
            script_page_num = script_num * PerformanceScript.BUFFER_SIZE - PerformanceScript.BUFFER_SIZE
            script = {
                'title': performance.title,
                'total_page_num': total_page_num,
                'page_num': script_num,
                'script': script[script_page_num: script_page_num+PerformanceScript.BUFFER_SIZE]
            }
            return script
    return False

