from django.contrib.auth.models import User
from django.utils.datastructures import MultiValueDict
from rest_framework.response import Response

from Gekidan100WebPage.utils.read_word import ReadWordFiles


def main(request, response: Response, data: dict):
    files: MultiValueDict = data['files']
    for key, value in files.items():
        file_name = str(value)
        if '.docx' in file_name:
            word_data = post_word_file(value)
            for i in word_data.text_list:
                print(i)
    return response



def post_word_file(value):
    bytes_data = value.read()
    word_data = ReadWordFiles()
    word_data.read_word_file(bytes_data)
    return word_data
