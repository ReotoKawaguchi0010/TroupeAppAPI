from Gekidan100WebPage.utils.config import TWT_ACCESS_SECRET, TWT_ACCESS_TOKEN, TWT_API_KEY, TWT_API_SECRET

from requests_oauthlib import OAuth1Session
import json


class TwitterApi():
    def __init__(self):
        API_KEY = TWT_API_KEY
        API_SECRET_KEY = TWT_API_SECRET
        ACCESS_TOKEN = TWT_ACCESS_TOKEN
        ACCESS_SECRET = TWT_ACCESS_SECRET
        self.twitter = OAuth1Session(API_KEY, API_SECRET_KEY, ACCESS_TOKEN, ACCESS_SECRET)

    def search(self, query, params):
        url = f'https://api.twitter.com/1.1/search/tweets.json?q={query}&src=typed_query'
        params = {'count': params}
        res = self.twitter.get(url, params=params)
        return json.loads(res.text)

if __name__ == '__main__':
    twt_api = TwitterApi()
    print(twt_api.search('ハリーポッター', 5))