import os
import zipfile
import io
import lxml.etree
import re

from dropbox import Dropbox
from dropbox.files import FileMetadata
from dropbox.sharing import FileLinkMetadata
import requests
import xmltodict

from v1.config import DROPBOX_TOKEN

test_file_name = __file__.replace(os.path.basename(__file__), '') + 'test.txt'


def extract_text(node):
    text = lxml.etree.tostring(node, encoding='utf-8').decode('utf-8')
    text = re.sub('<w:rt>.*?</w:rt>', '', text)
    text = re.sub('<.*?>', '', text)
    return text


class DropboxApi(Dropbox):
    uploads_dir = '/assets/uploads'

    def __init__(self):
        super(DropboxApi, self).__init__(DROPBOX_TOKEN)

    def list(self, path: str, share=False):
        path = '/assets/uploads' + path
        lists = {}
        if share:
            lists['links'] = self.sharing_list_shared_links(path).links
        lists['dir'] = self.files_list_folder(path).entries
        return lists

    def upload(self, path, bytes_file) -> FileMetadata:
        path = self.uploads_dir + '/' + path
        bytes_file = bytes(bytes_file)
        self.sharing_create_shared_link_with_settings(path)
        return self.files_upload(bytes_file, path)

    def get(self, path) -> str:
        name = path
        path = self.uploads_dir + '/' + path
        if path == '':
            path = self.uploads_dir + path
        links = self.sharing_list_shared_links(path).links
        for link in links:
            if isinstance(link, FileLinkMetadata):
                return self.get_file(link, name)
        return ''

    @staticmethod
    def get_file(link: FileLinkMetadata, file_name: str):
        if link.name == file_name:
            url = link.url
            url = re.sub(r'https?://(www.)?dropbox.com', 'https://dl.dropboxusercontent.com', url)
            url = re.sub(r'\?dl.*', '', url)
            return url
        return ''

    def get_word_file(self, path: str):
        word_in_dbx = \
            self.sharing_list_shared_links(path).links[0].url.replace('www.dropbox.com',
                                                                      'dl.dropboxusercontent.com').split(
                '?')[0]
        req = requests.get(word_in_dbx)
        with zipfile.ZipFile(io.BytesIO(req.content)) as z:
            xmlns = {'w': 'https://schemas.openxmlformats.org/wordprocessingml/2006/main'}
            xml_str = z.read('word/document2.xml')
            xml_str_style = z.read('word/styles.xml')
            styles = xmltodict.parse(xml_str_style.decode('utf-8'))
            default_font_size = int(styles['w:styles']['w:docDefaults']['w:rPrDefault']['w:rPr']['w:sz']['@w:val']) / 2
            dom = lxml.etree.fromstring(xml_str)
            text_nodes = dom.xpath('//w:p', namespaces=xmlns)
            text_list = []
            for text_node in text_nodes:
                xml_dicts = dict(
                    xmltodict.parse(lxml.etree.tostring(text_node, encoding='utf-8').decode('utf-8'))['w:p'])
                font_size = default_font_size

                for i in xml_dicts.keys():
                    if i == 'w:r':
                        if xml_dicts['w:r']['w:rPr'] is not None:
                            font_size = int(xml_dicts['w:r']['w:rPr']['w:sz']['@w:val']) / 2
                        break
                text = extract_text(text_node)
                text_list.append({'text': text, 'font_size': font_size})
            return text_list
