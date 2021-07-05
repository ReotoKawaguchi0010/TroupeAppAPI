import datetime

from django.utils.datastructures import MultiValueDict
from django.core.files.uploadedfile import InMemoryUploadedFile
from rest_framework.response import Response

from v1.models.performance.performance_script import PerformanceScript
from v1.utils.util import has_request_type
from v1.utils.http import has_post_key
from v1.api.drop_box_api import DropboxApi


def post_performance_script(response: Response, data: dict):
    performance_id = int(data['performanceID'])
    files: MultiValueDict = data['files']
    performance_script = PerformanceScript()
    performance_script.create(files, performance_id=performance_id)
    return response


def post_performance_video_list(response: Response, data: dict, files: dict):
    path_name = datetime.datetime.now().timestamp()
    dbx = DropboxApi()
    top_image = files['top_image']
    file: InMemoryUploadedFile
    for file in top_image:
        open = file.open('rb')
        f = open.read()
        dbx.upload(file.name, f)
        print(type(f))
        open.close()

    images = files['images']
    for file in images:
        print(file.name)
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
