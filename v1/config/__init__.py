import os
import configparser

from v1.utils import encode_sha256
conf = configparser.ConfigParser()

READ_PATH = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + '/config/config.ini'
conf.read(READ_PATH)

ENDPOINT = conf['endpoint']['endpoint']

TWT_API_KEY = conf['twitter']['api_key']
TWT_API_SECRET = conf['twitter']['api_secret_key']
TWT_ACCESS_TOKEN = conf['twitter']['access_token']
TWT_ACCESS_SECRET = conf['twitter']['access_secret']

FROM_ADDR = conf['mail']['from_addr']
PASSWORD = conf['mail']['password']
SMTP_HOST = conf['mail']['smtp_addr']
SMTP_PORT = conf['mail']['smtp_port']

ISG_API_KEY = conf['instagram']['api_key']

YTB_API_KEY = conf['youtube']['api_key']

REOTO_USER = conf['member']['reoto']
REOTO_PASS = encode_sha256(conf['member']['reoto_pass'])

DROPBOX_KEY = conf['dropbox']['api_key']
DROPBOX_TOKEN = conf['dropbox']['access_token']
DROPBOX_SECRET_KEY = conf['dropbox']['secret_key']

PAYPAL_SANDBOX_ACCOUNT = conf['paypal']['sandbox_account']
PAYPAL_CLIENT_ID = conf['paypal']['client_id']
PAYPAL_CLIENT_SECRET = conf['paypal']['client_secret']
PAYPAL_TEST_PAYMENT_ID = conf['paypal']['test_payment_id']
PAYPAL_TEST_PAYER_ID = conf['paypal']['test_payer_id']
PAYPAL_TEST_TOKEN = conf['paypal']['test_token']

CIPHER_HASH_COUNT = conf['cipher']['hash_count']
CIPHER_KEY = conf['cipher']['key']

if __name__ == '__main__':
    print(CIPHER_KEY)