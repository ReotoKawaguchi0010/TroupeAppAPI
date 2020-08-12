import requests
from Gekidan100WebPage.config.config import ISG_API_KEY


def req_insta():
    token = ISG_API_KEY
    url = f'https://graph.instagram.com/me?access_token={token}'
    req = requests.get(url)
    if '20' in str(req.status_code):
        return 1
    return 0
