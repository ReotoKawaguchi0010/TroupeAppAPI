from Gekidan100WebPage.config.config import TWT_ACCESS_SECRET, TWT_ACCESS_TOKEN, TWT_API_KEY, TWT_API_SECRET

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
        if '20' in str(res.status_code):
            return json.loads(res.text)
        return 0

    def account(self, query):
        url = f'https://api.twitter.com/1.1/collections/list.json?user_id={query}'
        res = self.twitter.get(url)
        print(res.text)

    def user_timeline(self):
        user_id = '1158411714280296449'
        url = f'https://api.twitter.com/1.1/statuses/user_timeline.json?user_id={user_id}&count=5'
        res = self.twitter.get(url)
        json_res = json.loads(res.text)
        data = [{'text': json_res[i]['text']} for i in range(len(json_res))]
        return data

if __name__ == '__main__':
    twt_api = TwitterApi()
    #print(twt_api.search('ハリーポッター', 5))
    tweet = twt_api.user_timeline()
    print(tweet)
