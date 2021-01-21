import os
import zipfile
import xmltodict
import json
import io
import re
import lxml

import docx

test_file_name =  __file__.replace(os.path.basename(__file__), '')+'test.docx'

class ReadWordFiles(object):

    def __init__(self):
        self.text_list = []
        self.title = ''


    def extract_text(self, node):
        text = lxml.etree.tostring(node, encoding='utf-8').decode('utf-8')
        text = re.sub('<w:rt>.*?</w:rt>', '', text)
        text = re.sub('<.*?>', '', text)

        return text

    def read_word_file(self, zip_data):
        with zipfile.ZipFile(io.BytesIO(zip_data)) as z:
            xmlns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
            xml_str = z.read('word/document.xml')
            xml_str_style = z.read('word/styles.xml')
            styles = xmltodict.parse(xml_str_style.decode('utf-8'))
            default_font_size = int(styles['w:styles']['w:docDefaults']['w:rPrDefault']['w:rPr']['w:sz']['@w:val']) / 2
            dom = lxml.etree.fromstring(xml_str)
            text_nodes = dom.xpath('//w:p', namespaces=xmlns)
            text_list = []
            for text_node in text_nodes:
                font_size = default_font_size
                text = self.extract_text(text_node)
                text_list.append({'text': text, 'font_size': font_size})
            self.text_list = text_list
            return text_list

    def dict_text_size(self):
        return [{'text': file.text, 'size': run.font.size/12700} for file in self.read_word_file() for run in file.runs]




if __name__ == '__main__':
    test = ReadWordFiles()
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

