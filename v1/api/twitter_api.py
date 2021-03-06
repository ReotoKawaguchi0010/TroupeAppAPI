from requests_oauthlib import OAuth1Session
import json

from v1.config import TWT_ACCESS_SECRET
from v1.config import TWT_ACCESS_TOKEN
from v1.config import TWT_API_KEY
from v1.config import TWT_API_SECRET


class TwitterApi(object):
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

    def user_timeline(self, limit_count: int):
        user_id = '1158411714280296449'
        url = f'https://api.twitter.com/1.1/statuses/user_timeline.json?user_id={user_id}&count={limit_count}'
        res = self.twitter.get(url)
        json_res = json.loads(res.text)
        data_list = []
        for i in range(len(json_res)):
            urls = [json_res[i]['entities']['urls'][j]['url'] for j in range(len(json_res[i]['entities']['urls']))]
            text = json_res[i]['text']
            for url in urls:
                text = json_res[i]['text'].replace(url, '')
            data = {
                'text': text,
                'urls': urls,
            }
            data_list.append(data)

        return data_list

    def get_id_content(self, user_id):
        url = f'https://api.twitter.com/1.1/statuses/show.json?id={user_id}'
        res = self.twitter.get(url)
        return res
