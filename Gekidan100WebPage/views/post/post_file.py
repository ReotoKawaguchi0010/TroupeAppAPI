from django.utils.datastructures import MultiValueDict
from rest_framework.response import Response


from Gekidan100WebPage.models.performance.performance_script import PerformanceScript


def main(request, response: Response, data: dict):
    performanceID = int(data['performanceID'])
    files: MultiValueDict = data['files']
    performance_script = PerformanceScript()
    confirm = performance_script.create(files, performanceID=performanceID)
    print(confirm)
    return response