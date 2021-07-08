import json

from django.utils.datastructures import MultiValueDict
from django.core.files.uploadedfile import InMemoryUploadedFile
from rest_framework.response import Response

from v1.models.performance.performance_script import PerformanceScript
from v1.models.performance_video_list import PerformanceVideoList
from v1.utils import has_request_type
from v1.utils.http import has_post_key
from v1.api.drop_box_api import DropboxApi


def post_performance_script(response: Response, data: dict):
    performance_id = int(data['performanceID'])
    files: MultiValueDict = data['files']
    performance_script = PerformanceScript()
    performance_script.create(files, performance_id=performance_id)
    return response


def post_performance_video_list(response: Response, data: dict, files: dict):
    performance_num = data['performance_num'][0]
    item_name = data['item_name'][0]
    release_date = data['release_date'][0]
    price = data['price'][0]
    payment_methods = data['payment_methods'][0]
    synopsis = data['synopsis'][0]
    top_image = ''
    images_list = []

    dir_name = f'performance_video_list/{performance_num}'
    dbx = DropboxApi()
    top_image_file = files['top_image']
    file: InMemoryUploadedFile
    for file in top_image_file:
        with file.open('rb') as f:
            f = f.read()
            path = f'{dir_name}/{file.name}'
            dbx.upload(path, f)
            top_image = dbx.get(path)
    images = files['images']
    for file in images:
        with file.open('rb') as f:
            f = f.read()
            path = f'{dir_name}/{file.name}'
            dbx.upload(path, f)
            images_list.append(dbx.get(path))

    pvl = PerformanceVideoList().create(performance_num=performance_num, item_name=item_name,
                                        release_date=release_date, price=price, payment_methods=payment_methods,
                                        synopsis=synopsis, top_image=top_image, images=json.dumps(images_list))
    print(pvl)
    return response


def main(request, response: Response):
    data = dict(request.POST)
    files: dict = dict(request.FILES)
    request_data = ''
    if has_post_key(request, 'type') and has_post_key(request, 'performanceID'):
        request_data = {'type': request.POST['type'], 'files': request.FILES,
                        'performanceID': request.POST['performanceID']}
    if has_request_type(data, ['upload_script']):
        response = post_performance_script(response, request_data)
    elif has_request_type(data, ['create_performance_video_list']):
        response = post_performance_video_list(response, data, files)
    return response
