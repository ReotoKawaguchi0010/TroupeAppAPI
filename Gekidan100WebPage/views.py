import requests
import xmltodict
import json

from .utils import util
from .utils import private_member as pm
from Gekidan100WebPage.utils.mail import info_send_mail, body_from_dict, info_response_mail

from django.shortcuts import render, HttpResponse, redirect


def init_page(request):
    js_list = util.import_js()
    css_list = util.import_css()
    return render(request, 'index.html', context={'js_list': js_list, 'css_list': css_list})

def overview_page(request):
    return render(request, 'overview.html')

def member_page(request):
    js_list = util.import_js()
    css_list = util.import_css()
    return render(request, 'index.html', context={'js_list': js_list, 'css_list': css_list})

def member_page1(request, test):
    return render(request, 'error.html')

def member_page2(request, test, test2):
    return render(request, 'error.html')

def schedule_page(request):
    return render(request, 'schedule.html')

def ticket_page(request):
    return render(request, 'ticket.html')

def mailform_page(request):
    if request.POST:
        print(request.POST)
    return render(request, 'mailform.html')

def private_member(request):
    return render(request, 'private_member.html')

def personal_member(request, name):
    print(name)
    return render(request, 'private_member.html')

def private_member_app_login(request):
    print(request.POST)
    if request.POST:
        for i in pm.members_password:
            if i == request.POST['password']:
                request.session.values()
                name = request.POST['name']
                request.session['private_member'] = True
                url = f'/2e480999f7936ed3dc505dbdf1767971cdae0214f6d6530dfd8391d6fad223f0/{name}'
                return redirect(url)
    return render(request, 'private_member_app/login.html')

def private_member_app(request, name):
    js_list = util.import_js()
    css_list = util.import_css()
    print(js_list)
    # if not request.session.has_key('private_member'):
    #     return redirect('/2e480999f7936ed3dc505dbdf1767971cdae0214f6d6530dfd8391d6fad223f0')
    return render(request, 'private_member_app/index.html', context={'js_list': js_list, 'css_list': css_list})


def ameba_json_api(request):
    get_content = requests.get('http://rssblog.ameba.jp/gekidan100/rss20.xml')
    xml_content = xmltodict.parse(get_content.text)
    json_encoded = json.dumps(xml_content)
    dict_encode = json.loads(json_encoded)
    description = dict_encode['rss']['channel']['item']
    return HttpResponse(json.dumps(description))


def test_json(request):
    req_body = request.body.decode(encoding='utf-8')
    req_body = json.loads(req_body)
    print(req_body)
    output = {'test': 'test'}
    response = HttpResponse(json.dumps(output), content_type="application/json")
    response["Access-Control-Allow-Origin"] = "localhost:3000"
    response["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS"
    response["Access-Control-Max-Age"] = "1000"
    response["Access-Control-Allow-Headers"] = "*"
    return response

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
    url = ''
    if 'iPhone' in request.headers['User-Agent']:
        url = 'youtube://'
    if request.GET:
        req = request.GET['url']
        return redirect(url + req)
    return HttpResponse('test')