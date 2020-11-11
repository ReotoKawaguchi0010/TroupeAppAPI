from django.test import TestCase

import asyncio

loop = asyncio.get_event_loop()

async def get_content(n):
    print(n)
    await asyncio.sleep(2)
    print(n*5)
    return n + 1

async def f(n):
    content = await get_content(n)
    print(content)
    return content




if __name__ == '__main__':
    # url = HOST + '/api/auth/'
    # req = requests.post(url, data={'username': 'reoto', 'password': 'c11e69e0503c6341c2e6ebd4fdf2ca3d9553fa25c01f9d6859c40ae19dde12bb'})
    # print(req.status_code)
    # if '20' in str(req.status_code):
    #     url2 = HOST + '/api/auth/reoto'
    #     req2 = requests.post(url2)
    #     print(req2.status_code)
    loop.run_until_complete(asyncio.wait([f(2)]))

