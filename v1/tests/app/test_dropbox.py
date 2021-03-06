from django.test import TestCase

from futsu100_api.settings import BASE_DIR
from v1.api.drop_box_api import DropboxApi


IMG_DIR = f'{BASE_DIR}/v1/tests/images'


class TestDropBox(TestCase):

    def setUp(self) -> None:
        self.dbx = DropboxApi()
        self.client = ''

    def test_get_data(self):
        print(self.dbx.get('test_img.jpg'))

    def test_upload(self):
        with open(f'{IMG_DIR}/test_img.jpg', 'rb') as i:
            img = i.read()
            self.dbx.upload('test_img_2.jpg', img)
            get = self.dbx.get('test_img_2.jpg')
            print(get)

    def test_get_list(self):
        print(self.dbx.get('test/100logo.png'))


