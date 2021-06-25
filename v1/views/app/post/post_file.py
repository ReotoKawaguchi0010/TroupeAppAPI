from django.utils.datastructures import MultiValueDict
from rest_framework.response import Response

from v1.models.performance.performance_script import PerformanceScript
from v1.utils.util import has_request_type
from v1.utils.http import has_post_key


def post_performance_script(response: Response, data: dict):
    performance_id = int(data['performanceID'])
    files: MultiValueDict = data['files']
    performance_script = PerformanceScript()
    performance_script.create(files, performance_id=performance_id)
    return response

def post_performance_video_list(response: Response, data: dict, files: dict):
    print(data)
    print(files)
    return response





def main(request, response: Response):
    data = dict(request.POST)
    files: dict = dict(request.FILES)
    request_data = ''
    if has_post_key(request, 'type') and has_post_key(request, 'performanceID'):
        request_data = {'type': request.POST['type'], 'files': request.FILES,
                        'performanceID': request.POST['performanceID']}
    if has_request_type(data, 'upload_script'):
        response = post_performance_script(response, request_data)
    elif has_request_type(data, 'create_performance_video_list'):
        response = post_performance_video_list(response, data, files)
    return response
