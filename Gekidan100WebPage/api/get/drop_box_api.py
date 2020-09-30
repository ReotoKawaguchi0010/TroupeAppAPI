import json
import os
import zipfile
import io
import xmltodict

import dropbox
import requests

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







if __name__ == '__main__':
    # dbx = dropbox.Dropbox(DROPBOX_TOKEN)
    # folder_path = '/test/'
    # file_name = 'test.txt'
    # with open(test_file_name, 'r') as f:
    #     test_folder_lists = dbx.files_list_folder('/test').entries
    #     for test_folder_list in test_folder_lists:
    #         if test_folder_list.name == file_name:
    #             dbx.files_delete_v2(folder_path+file_name)
    #     dbx.files_upload(bytes(f.read().encode('utf-8')), '/test/test.txt')

    dbx = DropboxApi(DROPBOX_TOKEN)
    # for file_folder_list in dbx.file_folder_lists('/test'):
    #     print(file_folder_list)

    #test = dbx.sharing_create_shared_link_with_settings('/test/Document.docx')
    #word_in_dbx = dbx.sharing_list_shared_links('/test/test.txt').links[1].url.replace('www.dropbox.com', 'dl.dropboxusercontent.com').split('?')[0]+'/text.txt'
    word_in_dbx = dbx.sharing_list_shared_links('/test/Document.docx').links[0].url.replace('www.dropbox.com', 'dl.dropboxusercontent.com').split('?')[0]
    req = requests.get(word_in_dbx)
    z = zipfile.ZipFile(io.BytesIO(req.content))
    print(z.filelist)
    for i in z.filelist:
        with z.open(i.filename) as myfile:
            myfile_dict = xmltodict.parse(myfile.read().decode('utf-8'))
    with z.open('word/document2.xml') as myfile:
        test_file = xmltodict.parse(myfile.read().decode('utf-8'))
        for k, v in json.loads(json.dumps(test_file))['w:document']['w:body'].items():
            print(k)
            print(v)





    #dbx.files_create_folder_v2('/test2')
    #dbx.files_delete_v2('/test2')

    # test = bytes('test'.encode('utf-8'))
    # bin_code = bin(int(test.hex()))
    # print(int(bin_code, 2))






