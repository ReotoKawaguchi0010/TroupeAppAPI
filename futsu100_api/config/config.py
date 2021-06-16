import os
import configparser

conf = configparser.ConfigParser()

READ_PATH = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + '/config/config.ini'
conf.read(READ_PATH)

PRO_SECRET_KEY = conf['project']['secret_key']

PSQL_NAME = conf['psql']['name']
PSQL_USER = conf['psql']['user']
PSQL_PASS = conf['psql']['password']

USE_DOMAIN = [
    'http://localhost:3000', 'http://127.0.0.1:3000',
    'http://127.0.0.1:3001', 'http://localhost:3001'
] if conf['mode']['dev'] == 'true' else ['https://futsu100.com']

CUSTOM_SESSION_COOKIE_NAME = conf['project']['session_cookie_name']
