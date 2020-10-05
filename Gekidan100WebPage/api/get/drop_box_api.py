import json
import os
import zipfile
import io
import lxml.etree
import re

import dropbox
import requests
import xmltodict

from Gekidan100WebPage.config.config import DROPBOX_TOKEN
from Gekidan100WebPage.utils.read_word import ReadWordFiles

test_file_name =  __file__.replace(os.path.basename(__file__), '')+'test.txt'


class DropboxApi(dropbox.Dropbox):

    def file_folder_lists(self, path):
        file_folder_lists = self.files_list_folder(str(path)).entries
        return file_folder_lists

    def file_update(self, path, bytes_file, file_name):
        bytes_file = bytes(bytes_file)
        for file_folder_list in self.file_folder_lists(str(path)):
            if file_folder_list.name == file_name:
                self.files_delete_v2(path+file_name)
                break
        self.files_upload(bytes_file, path)

    def get_link_list(self, path):
        links = self.sharing_list_shared_links(path).links
        print(links)







if __name__ == '__main__':
    def extract_text(node):
        text = lxml.etree.tostring(node, encoding='utf-8').decode('utf-8')
        text = re.sub('<w:rt>.*?</w:rt>', '', text)
        text = re.sub('<.*?>', '', text)

        return text


    dbx = DropboxApi(DROPBOX_TOKEN)
    # for file_folder_list in dbx.file_folder_lists('/test'):
    #     print(file_folder_list)

    #test = dbx.sharing_create_shared_link_with_settings('/test/Document.docx')
    #word_in_dbx = dbx.sharing_list_shared_links('/test/test.txt').links[1].url.replace('www.dropbox.com', 'dl.dropboxusercontent.com').split('?')[0]+'/text.txt'
    word_in_dbx = dbx.sharing_list_shared_links('/test/Document.docx').links[0].url.replace('www.dropbox.com', 'dl.dropboxusercontent.com').split('?')[0]
    req = requests.get(word_in_dbx)
    z = zipfile.ZipFile(io.BytesIO(req.content))
    xmlns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
    xml_str = z.read('word/document2.xml')
    xml_str_style = z.read('word/styles.xml')

    styles = xmltodict.parse(xml_str_style.decode('utf-8'))
    default_font_size = int(styles['w:styles']['w:docDefaults']['w:rPrDefault']['w:rPr']['w:sz']['@w:val'])/2





    dom = lxml.etree.fromstring(xml_str)
    text_nodes = dom.xpath('//w:p', namespaces=xmlns)
    text_list = []
    for text_node in text_nodes:
        xml_dicts = dict(xmltodict.parse(lxml.etree.tostring(text_node, encoding='utf-8').decode('utf-8'))['w:p'])
        font_size = default_font_size

        for i in xml_dicts.keys():
            if i == 'w:r':
                if xml_dicts['w:r']['w:rPr'] is not None:
                    font_size = int(xml_dicts['w:r']['w:rPr']['w:sz']['@w:val'])/2
                break
        print(font_size)
        text = extract_text(text_node)
        text_list.append({text: font_size})
    print(text_list)





    # for i in z.filelist:
    #     with z.open(i.filename) as myfile:
    #         myfile_dict = xmltodict.parse(myfile.read().decode('utf-8'))
    # with z.open('word/document2.xml') as myfile:
    #     test_file = xmltodict.parse(myfile.read().decode('utf-8'))
    #     document_file = json.loads(json.dumps(test_file))['w:document']['w:body']
    #     for k, v in document_file.items():
    #         print(k)
    #         print(v)
    z.close()










