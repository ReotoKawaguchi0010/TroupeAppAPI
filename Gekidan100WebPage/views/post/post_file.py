from django.utils.datastructures import MultiValueDict
from rest_framework.response import Response


from Gekidan100WebPage.models.performance.performance_script import PerformanceScript
from Gekidan100WebPage.models.performance.performance import Peformance
from Gekidan100WebPage.models.performance.script import Script


def main(request, response: Response, data: dict):
    performanceID = int(data['performanceID'])
    files: MultiValueDict = data['files']
    performance_script = PerformanceScript(version=1)
    confirm = performance_script.create(performanceID=performanceID, script_files=files)
    print(confirm)
    return response