import requests
import xmltodict
import json


def ameba_json_api():
    get_content = requests.get('http://rssblog.ameba.jp/gekidan100/rss20.xml')
    xml_content = xmltodict.parse(get_content.text)
    json_encoded = json.dumps(xml_content)
    dict_encode = json.loads(json_encoded)
    description = dict_encode['rss']['channel']['item']
    return json.dumps(description)