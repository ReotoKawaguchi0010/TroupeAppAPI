from Gekidan100WebPage.config.config import YTB_API_KEY
import requests

def req_youtube():
    token = YTB_API_KEY
    url = f'https://www.googleapis.com/youtube/v3/channels?maxResults=10&id=UC0R-BcwISaK3qUC4a8pJThg&v=2&key={token}'
    req = requests.get(url)
    if '20' in str(req.status_code):
        return 1
    return 0

if __name__ == '__main__':
    print(req_youtube())

