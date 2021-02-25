import zipfile
import io
import re

import xmltodict
from lxml import etree


class ReadWordFiles(object):

    BUFFER_SIZE = 34

    def __init__(self):
        self.text_list = []
        self.title = ''

    def extract_text(self, node):
        text = etree.tostring(node, encoding='utf-8').decode('utf-8')
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
            dom = etree.fromstring(xml_str)
            text_nodes = dom.xpath('//w:p', namespaces=xmlns)
            text_list = {}
            for i in range(len(text_nodes)):
                text_node = text_nodes[i]
                font_size = default_font_size
                text = self.extract_text(text_node)
                text_list[i] = {'text': text, 'font_size': font_size}
            self.text_list = text_list
            return text_list



def post_word_file(value):
    bytes_data = value.read()
    word_data = ReadWordFiles()
    word_data.read_word_file(bytes_data)
    return word_data


if __name__ == '__main__':
    test = ReadWordFiles()