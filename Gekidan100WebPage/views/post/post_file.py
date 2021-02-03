from django.utils.datastructures import MultiValueDict
from rest_framework.response import Response
import sys
import io
import pickle
import json


from Gekidan100WebPage.utils.read_word import post_word_file
from Gekidan100WebPage.models.performance.performance_script import PerformanceScript
from Gekidan100WebPage.models.performance.performance import Peformance
from Gekidan100WebPage.models.performance.script import Script


def main(request, response: Response, data: dict):
    performanceID = int(data['performanceID'])
    performance_script = PerformanceScript()
    performance = Peformance.objects.filter(id=performanceID)
    script = Script()
    files: MultiValueDict = data['files']
    for key, value in files.items():
        file_name = str(value)
        if '.docx' in file_name:
            word_data = post_word_file(value)
            print(sys.getsizeof(word_data.text_list))
            serialize = pickle.dumps(word_data.text_list)
            script.script = serialize
            script.save()
            performance_script.performance = performance[0]
            performance_script.script = script
            performance_script.save()
            break

    return response