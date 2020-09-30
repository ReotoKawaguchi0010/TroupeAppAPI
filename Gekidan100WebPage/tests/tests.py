from django.test import TestCase

import requests

HOST = 'http://localhost:8000'

if __name__ == '__main__':
    # url = HOST + '/api/auth/'
    # req = requests.post(url, data={'username': 'reoto', 'password': 'c11e69e0503c6341c2e6ebd4fdf2ca3d9553fa25c01f9d6859c40ae19dde12bb'})
    # print(req.status_code)
    # if '20' in str(req.status_code):
    #     url2 = HOST + '/api/auth/reoto'
    #     req2 = requests.post(url2)
    #     print(req2.status_code)
    import os
    file_name =  __file__.replace(os.path.basename(__file__), '')+'test.txt'
    print()

    with open(file_name, 'w') as f:
        f.write('test')

