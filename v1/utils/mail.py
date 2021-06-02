from email.mime.text import MIMEText
from email.utils import formatdate

import smtplib
import logging

from v1.config.config import FROM_ADDR, PASSWORD, SMTP_SERVER, SMTP_PORT

def body_from_dict(dict):
    name = '名前:' + dict['secondName'] + ' ' + dict['firstName'] + '\n'
    phonetic = 'フリガナ:' + dict['secondPhonetic'] + ' ' + dict['firstPhonetic'] + '\n'
    mail_address = 'メールアドレス:' + dict['mailAddress'] + '\n'
    address = 'ご住所:' + dict['address'] + '\n'
    cities = '市区町村:' + dict['cities'] + '\n'
    house_number = '番地・建物名:' + dict['houseNumber'] + '\n'
    profession = '職業:' + dict['profession'] + '\n'
    text_area = 'その他お問い合わせ:' + dict['textArea']
    return name + phonetic + mail_address + address + cities + house_number + profession + text_area

def response_send_mail_address(dict):
    body = body_from_dict(dict)
    resp_body = f"""
        件名

    劇団沸にお問い合わせいただきありがとうございます。

    本文

    このメールはシステムからの自動返信です。

    以下の内容でお問い合わせを受付いたしました。

    ●後日担当ものよりご連絡致しますので今しばらくお待ちくださいませ。

    ▼お問い合わせ内容▼
    -------------------------------------------
    {body}
    --------------------------------------------
    ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿

    劇団沸
    ＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
    """
    return resp_body

def info_send_mail(to_addr, dict_body, subject):
    try:
        smtpobj = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        smtpobj.ehlo()
        smtpobj.starttls()
        smtpobj.ehlo()
        smtpobj.login(FROM_ADDR, PASSWORD)
        body = body_from_dict(dict_body)
        msg = MIMEText(body)
        msg['Subject'] = subject
        msg['From'] = FROM_ADDR
        msg['To'] = to_addr
        msg['Date'] = formatdate()
        smtpobj.sendmail(FROM_ADDR, FROM_ADDR, msg.as_string())
        smtpobj.close()
    except:
        logging.log(logging.FATAL, 'error')
        return False
    return True

def info_response_mail(to_addr, dict_body, subject):
    try:
        smtpobj = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        smtpobj.ehlo()
        smtpobj.starttls()
        smtpobj.ehlo()
        smtpobj.login(FROM_ADDR, PASSWORD)
        body = response_send_mail_address(dict_body)
        msg = MIMEText(body)
        msg['Subject'] = subject
        msg['From'] = FROM_ADDR
        msg['To'] = to_addr
        msg['Date'] = formatdate()
        smtpobj.sendmail(FROM_ADDR, to_addr, msg.as_string())
        smtpobj.close()
    except:
        logging.log(logging.FATAL, 'error')
        return False
    return True

if __name__ == '__main__':
    print('')