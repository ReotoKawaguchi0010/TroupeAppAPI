from Gekidan100.settings import BASE_DIR

import os
import configparser
conf = configparser.ConfigParser()

READ_PATH = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + '/utils/utils.ini'
conf.read(READ_PATH)


TWT_API_KEY = conf['twitter']['api_key']
TWT_API_SECRET = conf['twitter']['api_secret_key']
TWT_ACCESS_TOKEN = conf['twitter']['access_token']
TWT_ACCESS_SECRET = conf['twitter']['access_secret']

FROM_ADDR = conf['mail']['from_addr']
PASSWORD = conf['mail']['password']
SMTP_SERVER = conf['mail']['smtp_addr']
SMTP_PORT = conf['mail']['smtp_port']

if __name__ == '__main__':
    print(TWT_API_KEY)