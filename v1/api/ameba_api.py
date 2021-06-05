import requests
import xmltodict


def get_ameba_content():
    get_content = requests.get('http://rssblog.ameba.jp/gekidan100/rss20.xml')
    blog_items: list = xmltodict.parse(get_content.text)['rss']['channel']['item']
    response = []
    for blog_item in blog_items:
        title = blog_item['title']
        link = blog_item['link']
        pubDate = blog_item['pubDate']
        data = {
            'title': title,
            'link': link,
            'date': pubDate,
        }
        response.append(data)
    return response

if __name__ == '__main__':
    print(get_ameba_content())