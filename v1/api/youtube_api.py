from v1.config.config import YTB_API_KEY
import requests
import json
token = YTB_API_KEY

def req_youtube():
    #url = f'https://www.googleapis.com/youtube/v3/channels?&part=contentDetails&id=UC0R-BcwISaK3qUC4a8pJThg&v=2&key={token}'
    #url = f'https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=UC2avfYxoYQZxchEmVxypnrg&v=2&key={token}'
    url = f'https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key={token}&part=snippet'
    req = requests.get(url)
    if '20' in str(req.status_code):
        return req.text
    return req.text

def youtube_get_videos():
    get_id = json.loads(req_youtube())
    get_id =  get_id['items'][0]['contentDetails']['relatedPlaylists']['uploads']
    url = f'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId={get_id}&maxResults=10&key={token}'
    req = requests.get(url)
    if '20' in str(req.status_code):
        get_videos = json.loads(req.text)
        video_ids = [i['snippet']['resourceId']['videoId'] for i in get_videos['items']]
        return video_ids
    return None

if __name__ == '__main__':
    print(req_youtube())

