import requests
import xmltodict
import json

from Gekidan100WebPage.utils.mail import info_send_mail, info_response_mail

from django.shortcuts import HttpResponse

def init_page(request):
    output = {'request': 'init'}
    response = HttpResponse(json.dumps(output), content_type='application/json')
    return response

def ameba_json_api(request):
    get_content = requests.get('http://rssblog.ameba.jp/gekidan100/rss20.xml')
    xml_content = xmltodict.parse(get_content.text)
    json_encoded = json.dumps(xml_content)
    dict_encode = json.loads(json_encoded)
    description = dict_encode['rss']['channel']['item']
    return HttpResponse(json.dumps(description))

def send_mail(request):
    try:
        req_body = request.body.decode(encoding='utf-8')
        req_body = json.loads(req_body)
        info_send_mail(req_body['mailAddress'], req_body, req_body['content'])
        info_response_mail(req_body['mailAddress'], req_body, req_body['content'])
        return HttpResponse('1')
    except:
        return HttpResponse('0')

def youtube(request):
    url = 'https://youtube.com/'
    if request.GET:
        if 'iPhone' in request.headers['User-Agent']:
            url = 'youtube://'
        req = request.GET['url']
        req = req.replace('https://youtube.com/', '')
        req = req.replace('https://www.youtube.com/', '')
        print(url + req)
        return HttpResponse(url + req)
    return HttpResponse('test')

#redirect(url + req)