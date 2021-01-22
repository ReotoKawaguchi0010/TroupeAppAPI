from django.utils.datastructures import MultiValueDict
from rest_framework.response import Response

from Gekidan100WebPage.utils.read_word import post_word_file


def main(request, response: Response, data: dict):
    files: MultiValueDict = data['files']
    for key, value in files.items():
        file_name = str(value)
        if '.docx' in file_name:
            word_data = post_word_file(value)
    return response

