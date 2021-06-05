import math
from django.db import models

from v1.utils.read_word import post_word_file
from v1.models.performance.performance import Peformance


class PerformanceScript(models.Model):
    BUFFER_SIZE = 34

    performance = models.ForeignKey(Peformance, on_delete=models.CASCADE)
    script = models.FileField()

    def create(self, files, performance_id=None):
        if performance_id is not None:
            performance = Peformance.objects.filter(id=performance_id).exists()
            if performance:
                self.performance = Peformance.objects.get(id=performance_id)
            for _, file in files.items():
                file_name = str(file)
                if '.docx' in file_name:
                    self.script = file
                    break
            self.save()
            return True
        return False

    def read(self, performance_id):
        performance = Peformance.objects.filter(id=performance_id)
        if performance.exists():
            performance = Peformance.objects.get(id=performance_id)
            performance_script = self.__class__.objects.filter(performance=performance)
            if performance_script.exists():
                return performance_script
        return None

    def delete(self, using=None, keep_parents=False):
        performance_script = self.__class__.objects.filter(performance=self.performance)
        if performance_script.exists():
            performance_script.delete()
            return True
        return False

    def json_read(self, performance_id, script_num, version):
        performance_script = self.read(performance_id)[version]
        performance = performance_script.performance
        word_data = post_word_file(performance_script.script)
        total_page_num = math.ceil(len(word_data.text_list) / self.BUFFER_SIZE)
        script_page_num = script_num * self.BUFFER_SIZE - self.BUFFER_SIZE
        script = {
            'title': performance.title,
            'total_page_num': total_page_num,
            'page_num': script_num,
            'scripts': word_data.text_list[script_page_num: script_page_num + self.BUFFER_SIZE]
        }
        return script
