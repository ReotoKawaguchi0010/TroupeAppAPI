import requests
import xmltodict
import json

from .utils import util

from django.shortcuts import render, HttpResponse
from django.http.request import QueryDict



def init_page(request):
    return render(request, 'index.html')

def overview_page(request):
    return render(request, 'overview.html')

def member_page(request):
    return render(request, 'member.html')

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


def ameba_json_api(request):
    get_content = requests.get('http://rssblog.ameba.jp/gekidan100/rss20.xml')
    xml_content = xmltodict.parse(get_content.text)
    json_encoded = json.dumps(xml_content)
    dict_encode = json.loads(json_encoded)
    description = dict_encode['rss']['channel']['item']
    return HttpResponse(json.dumps(description))

def twitter_json_api(request):
    return HttpResponse(json.dumps(util.fetch_twt()))
