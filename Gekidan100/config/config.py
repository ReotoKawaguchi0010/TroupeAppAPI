import os
import configparser

conf = configparser.ConfigParser()

READ_PATH = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + '/config/config.ini'
conf.read(READ_PATH)

PRO_SECRET_KEY = conf['project']['secret_key']

PSQL_NAME = conf['psql']['name']
PSQL_USER = conf['psql']['user']
PSQL_PASS = conf['psql']['password']