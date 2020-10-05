import os
import zipfile
import xmltodict
import json

import docx

test_file_name =  __file__.replace(os.path.basename(__file__), '')+'test.docx'

class ReadWordFiles(object):

    def __init__(self, filename):
        self.filename = str(filename)
        self.docx = docx.Document(self.filename)

    def read_word_file(self):
        return [doc for doc in self.docx.paragraphs]

    def dict_text_size(self):
        return [{'text': file.text, 'size': run.font.size/12700} for file in self.read_word_file() for run in file.runs]




if __name__ == '__main__':
    test = ReadWordFiles(test_file_name)
    print(test.read_word_file())
    for i in test.read_word_file():
        print(i.text)
        for v in i.runs:
            print(v.font.size/12700)

    print(test.dict_text_size())

    file = 'test.docx'
    with zipfile.ZipFile(open(file, 'rb')) as f:
        print(f.filelist)
    #with zipfile.ZipFile(test_file_name) as f:
        # for i in f.filelist:
        #     with f.open(i.filename) as myfile:
        #         print(i.filename)
        #         myfile_dict = xmltodict.parse(myfile.read().decode('utf-8'))
        #         print(myfile_dict)
        #with f.open('word/document.xml') as myfile:
            #test_file = xmltodict.parse(myfile.read().decode('utf-8'))
            #for k, v in json.loads(json.dumps(test_file))['w:document']['w:body'].items():
               # print(k)
               # print(v)

