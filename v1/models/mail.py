import smtplib
import logging
from email.mime.text import MIMEText
from email.utils import formatdate

from v1.config import FROM_ADDR
from v1.config import PASSWORD
from v1.config import SMTP_HOST
from v1.config import SMTP_PORT


class AutoContactMail(object):

    def __init__(self, **kwargs):
        self.first_name = kwargs['first_name'] if 'first_name' in kwargs else None
        self.second_name = kwargs['second_name'] if 'second_name' in kwargs else None
        self.first_phonetic = kwargs['first_phonetic'] if 'first_phonetic' in kwargs else None
        self.second_phonetic = kwargs['second_phonetic'] if 'second_phonetic' in kwargs else None
        self.mail_address = kwargs['mail_address'] if 'mail_address' in kwargs else None
        self.address = kwargs['address'] if 'address' in kwargs else None
        self.cities = kwargs['cities'] if 'cities' in kwargs else None
        self.house_number = kwargs['house_number'] if 'house_number' in kwargs else None
        self.profession = kwargs['profession'] if 'profession' in kwargs else None
        self.text_area = kwargs['text_area'] if 'text_area' in kwargs else None
        self.text_sender_data = self.to_text_sender_data()

    def to_text_sender_data(self):
        return f'''
名前: {self.second_name} {self.first_name}
フリガナ: {self.second_phonetic} {self.first_phonetic}
メールアドレス: {self.mail_address}
ご住所: {self.address}
市区町村: {self.cities}
番地・建物名: {self.house_number}
職業: {self.profession}
その他お問い合わせ: {self.text_area}
'''

    def to_sender_mail_text(self):
        return f'''
件名
劇団沸にお問い合わせいただきありがとうございます。

本文
このメールはシステムからの自動返信です。

以下の内容でお問い合わせを受付いたしました。

●後日担当ものよりご連絡致しますので今しばらくお待ちくださいませ。

▼お問い合わせ内容▼
------------------------------------------------
{self.text_sender_data}
------------------------------------------------
＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
劇団沸
メールアドレス: info@futsu100.com
＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿＿
'''

    def to_sender_mail(self, subject, smtpobj: smtplib.SMTP):
        try:
            msg = MIMEText(self.to_sender_mail_text())
            msg['Subject'] = subject
            msg['From'] = FROM_ADDR
            msg['To'] = self.mail_address
            msg['Date'] = formatdate()
            smtpobj.sendmail(FROM_ADDR, self.mail_address, msg.as_string())
        except smtplib.__all__:
            return False
        return True

    def to_recipient_mail(self, subject, smtpobj: smtplib.SMTP):
        try:
            msg = MIMEText(self.text_sender_data)
            msg['Subject'] = subject
            msg['From'] = FROM_ADDR
            msg['To'] = self.mail_address
            msg['Date'] = formatdate()
            smtpobj.sendmail(FROM_ADDR, FROM_ADDR, msg.as_string())
        except smtplib.__all__:
            logging.log(logging.FATAL, 'error')
            return False
        return True

    def __send(self, subject):
        try:
            smtpobj = smtplib.SMTP(SMTP_HOST, SMTP_PORT)
            smtpobj.ehlo()
            smtpobj.starttls()
            smtpobj.ehlo()
            smtpobj.login(FROM_ADDR, PASSWORD)
            self.to_sender_mail(subject, smtpobj)
            self.to_recipient_mail(subject, smtpobj)
            smtpobj.close()
        except smtplib.__all__:
            return False
        return True

    def send(self):
        if self.mail_address and self.first_name:
            self.__send('お問い合わせ')
        return {'message': '送信完了'}
