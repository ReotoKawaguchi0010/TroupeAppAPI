import hashlib
import requests
import json
import os
import configparser

from Gekidan100.settings import BASE_DIR

conf = configparser.ConfigParser()
conf.read('utils.ini')

def encode_sha256(encode_letter):
    s256 = hashlib.sha256(encode_letter.encode('utf-8')).hexdigest()
    return s256

def import_js():
    path = os.getcwd() + '/Gekidan100WebPage/static/app_js/my-app/build/static/js'
    read_js = os.listdir(path)
    result = []
    for i in read_js:
        if i[-1] == 's':
            result.append(i)
    return result

def import_css():
    path = os.getcwd() + '/Gekidan100WebPage/static/app_js/my-app/build/static/css'
    read_js = os.listdir(path)
    result = []
    for i in read_js:
        if i[-1] == 's':
            result.append(i)
    return result




def req_youtube():
    token = conf['youtube']['api_key']
    url = f'https://www.googleapis.com/youtube/v3/channels?maxResults=10&id=UC0R-BcwISaK3qUC4a8pJThg&v=2&key={token}'
    req = requests.get(url)
    print(req.text)
    return None

def req_insta():
    token = conf['instagram']['api_key']
    url = f'https://graph.instagram.com/me?access_token={token}'
    req = requests.get(url)
    print(req)
    return None


if __name__ == '__main__':
    req_youtube()