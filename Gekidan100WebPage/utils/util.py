from email.mime.text import MIMEText
from email.utils import formatdate

import hashlib
import smtplib
import logging
import requests
import json
import socket

def encode_sha256(encode_letter):
    s256 = hashlib.sha256(encode_letter.encode('utf-8')).hexdigest()
    return s256

MAIL_ADDRESS = 'gekian10008091011@gmail.com'
PASSWORD = 'Ghqsatou2468'
FROM_ADDR = 'info@gekidan100.com'

def info_send_mail(to_addr, body, subject):
    try:
        from_addr = 'info@gekidan100.com'
        smtpobj = smtplib.SMTP('smtp.gmail.com', 587)
        smtpobj.ehlo()
        smtpobj.starttls()
        smtpobj.ehlo()
        smtpobj.login(MAIL_ADDRESS, PASSWORD)
        msg = MIMEText(body)
        msg['Subject'] = subject
        msg['From'] = FROM_ADDR
        msg['To'] = to_addr
        msg['Date'] = formatdate()
        smtpobj.sendmail(from_addr, to_addr, msg.as_string())
        smtpobj.close()
    except:
        logging.log(logging.FATAL, 'error')
        return False
    return True

API_KEY = 'L8ntmStID5AoyArEt14ruwy87'
API_SECRET_KEY = 'p9m7mJdsF9FqN0bV7nc5j6aaDzXjaUOzuDkVsLAIs1GStb11s4'
BEARER_TOKEN = 'AAAAAAAAAAAAAAAAAAAAABKFGAEAAAAA%2B7J9pMA6mA%2F6GQdnjcZGeLL2WIU%3DA9oUdlxB1525HqnnLDsLTe8S28VovLIGJnVayWvt7zbnAXNaN7'
client_key = '1262066029607350273-shdhThBxqTvutJP0PkU7ROky8ejRRD'
client_secret = 'a2mnUhj4E4410bWsEzq7x5MOGpGHFWiBpvIR78I9PDsz9'

def fetch_twt():
    import base64

    key_secret = '{}:{}'.format(client_key, client_secret).encode('ascii')
    b64_encoded_key = base64.b64encode(key_secret)
    b64_encoded_key = b64_encoded_key.decode('ascii')

    baseurl = 'https://api.twitter.com/1.1/search/tweets.json?q=from%3ANasa%20OR%20%23nasa'
    auth_url = '{}oauth2/token'.format(baseurl)

    auth_headers = {
        'Authorization': 'Basic {}'.format(b64_encoded_key),
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        API_KEY: API_SECRET_KEY
    }

    auth_data = {
        'grant_type': 'client_credentials'
    }

    auth_resp = requests.post(auth_url, headers=auth_headers, data=auth_data)
    print(auth_resp)

def socket_server():
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(('localhost', 50007))
        s.listen()
        while True:
            conn, addr = s.accept()
            print(s)
            print(conn)
            print(addr)



if __name__ == '__main__':
    pass