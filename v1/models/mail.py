from email.mime.text import MIMEText
from email.utils import formatdate

from smtplib import SMTPException
import smtplib
import logging

from v1.config import FROM_ADDR
from v1.config import PASSWORD
from v1.config import SMTP_SERVER
from v1.config import SMTP_PORT


class AutoContactMail(object):

    def __init__(self, first_name, second_name, first_phonetic,
                 second_phonetic, mail_address, address, cities,
                 house_number, profession, text_area):
        self.first_name = first_name
        self.second_name = second_name
        self.first_phonetic = first_phonetic
        self.second_phonetic = second_phonetic
        self.mail_address = mail_address
        self.address = address
        self.cities = cities
        self.house_number = house_number
        self.profession = profession
        self.text_area = text_area
        self.text_sender_data = self.to_text_sender_data()

    def to_text_sender_data(self):
        return f''''
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

    def to_sender_mail(self, to_addr, subject):
        try:
            smtpobj = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
            smtpobj.ehlo()
            smtpobj.starttls()
            smtpobj.ehlo()
            smtpobj.login(FROM_ADDR, PASSWORD)
            msg = MIMEText(self.to_sender_mail_text())
            msg['Subject'] = subject
            msg['From'] = FROM_ADDR
            msg['To'] = to_addr
            msg['Date'] = formatdate()
            smtpobj.sendmail(FROM_ADDR, to_addr, msg.as_string())
            smtpobj.close()
        except SMTPException:
            return False
        return True

    def to_recipient_mail(self, to_addr, subject):
        try:
            smtpobj = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
            smtpobj.ehlo()
            smtpobj.starttls()
            smtpobj.ehlo()
            smtpobj.login(FROM_ADDR, PASSWORD)
            msg = MIMEText(self.text_sender_data)
            msg['Subject'] = subject
            msg['From'] = FROM_ADDR
            msg['To'] = to_addr
            msg['Date'] = formatdate()
            smtpobj.sendmail(FROM_ADDR, FROM_ADDR, msg.as_string())
            smtpobj.close()
        except SMTPException:
            logging.log(logging.FATAL, 'error')
            return False
        return True
