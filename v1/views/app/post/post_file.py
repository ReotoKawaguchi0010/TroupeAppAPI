from django.utils.datastructures import MultiValueDict
from rest_framework.response import Response


from v1.models.performance.performance_script import PerformanceScript


def main(response: Response, data: dict):
    performance_id = int(data['performanceID'])
    files: MultiValueDict = data['files']
    performance_script = PerformanceScript()
    confirm = performance_script.create(files, performance_id=performance_id)
    print(confirm)
    return response
