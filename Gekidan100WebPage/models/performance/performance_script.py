import pickle
import math
import zlib
from django.db import models

from Gekidan100WebPage.utils.read_word import post_word_file
from Gekidan100WebPage.models.performance.performance import Peformance
from Gekidan100WebPage.models.performance.script import Script


class PerformanceScript(models.Model):
    BUFFER_SIZE = 34

    performance = models.ForeignKey(Peformance, on_delete=models.CASCADE)
    script = models.ForeignKey(Script, on_delete=models.CASCADE)
    version = models.IntegerField(null=True)

    @classmethod
    def search_script(cls):
        return {}

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

    def create(self, performanceID=None, script_files=None):
        if performanceID is not None and script_files is not None:
            performance = Peformance.objects.filter(id=performanceID).exists()
            if performance:
                self.performance = Peformance.objects.get(id=performanceID)
            for key, value in script_files.items():
                file_name = str(value)
                if '.docx' in file_name:
                    word_data = post_word_file(value)
                    serialize = pickle.dumps(word_data.text_list)
                    compress = zlib.compress(serialize)
                    script = Script(script=compress)
                    script.save()
                    self.script = script
            import sys
            print(sys.getsizeof(self.script.script))
            self.save()
            return True
        return False

    def read(self):
        decompress = zlib.decompress()
        print(pickle.loads(decompress))
        return None

    def delete(self, using=None, keep_parents=False):
        performance_script = self.__class__.objects.filter(performance=self.performance)
        if performance_script.exists():
            performance_script = self.__class__.objects.filter(performance=self.performance)
            performance_script.delete()
            return True
        return False


def models_get_script(performance_id, script_num):
    if Peformance.objects.filter(id=performance_id).exists():
        performance = Peformance.objects.get(id=performance_id)
        if PerformanceScript.objects.filter(performance=performance).exists():
            performance_script = PerformanceScript.objects.get(performance=performance)
            script = performance_script.script
            decompress = zlib.decompress(script.script)
            script = pickle.loads(decompress)
            total_page_num = math.ceil(len(script) / PerformanceScript.BUFFER_SIZE)
            script_page_num = script_num * PerformanceScript.BUFFER_SIZE - PerformanceScript.BUFFER_SIZE
            script = {
                'title': performance.title,
                'total_page_num': total_page_num,
                'page_num': script_num,
                'scripts': script[script_page_num: script_page_num+PerformanceScript.BUFFER_SIZE]
            }
            return script
    return False

