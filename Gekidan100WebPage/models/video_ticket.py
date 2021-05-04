import datetime
import secrets

from django.db import models

from Gekidan100WebPage.utils.util import encode_sha256


class VideoTicket(models.Model):
    name = models.CharField(max_length=137)
    permit = models.BooleanField(null=True)
    payment_methods = models.CharField(max_length=256)
    mail_address = models.CharField(max_length=256)
    phone_number = models.CharField(max_length=16)
    payment_id = models.CharField(max_length=256)
    payer_id = models.CharField(max_length=256)
    token = models.CharField(max_length=256)
    payment_id_hash = models.CharField(max_length=70)
    payer_id_hash = models.CharField(max_length=70)
    timestamp = models.CharField(max_length=128)
    joint = models.CharField(max_length=256)

    def create(self, data: dict):
        if self.has_need_payment_data(data):
            self.__select_payment_methods_create(data)

    @staticmethod
    def permit_check(payment_methods):
        if payment_methods == 'paypal':
            return True
        return False

    @staticmethod
    def has_need_payment_data(data):
        if data.keys() >= {
            'name',
            'payment_methods',
            'mail_address',
            'phone_number',
            'payment_id',
            'payer_id',
            'token'
        } or data.keys() >= {
            'name',
            'payment_methods',
            'mail_address'
            'phone_number',
        }:
            return True
        return False

    def __select_payment_methods_create(self, data):
        if data['payment_methods'] == 'paypal':
            return self.__paypal_create(name=data['name'],
                                        payment_methods=data['payment_methods'],
                                        mail_address=data['mail_address'],
                                        phone_number=data['phone_number'],
                                        payment_id=data['payment_id'],
                                        payer_id=data['payer_id'],
                                        token=data['token'])
        elif data['payment_methods'] == 'transfer':
            return self.__transfer_create(name=data['name'],
                                          payment_methods=data['payment_methods'],
                                          mail_address=data['mail_address'],
                                          phone_number=data['phone_number'])
        return None

    def __transfer_create(self, name, payment_methods, mail_address, phone_number):
        self.name = name
        self.permit = self.permit_check(payment_methods)
        self.payment_methods = payment_methods
        self.mail_address = mail_address
        self.phone_number = phone_number
        self.payer_id = encode_sha256(name)
        self.payment_id = encode_sha256(encode_sha256(name) + encode_sha256(payment_methods))
        self.token = secrets.token_hex()
        self.payment_id_hash = encode_sha256(self.payment_id)
        self.payer_id_hash = encode_sha256(self.payer_id)
        self.timestamp = str(datetime.datetime.now().timestamp())
        self.joint = encode_sha256(encode_sha256(self.timestamp) + self.payer_id + str(self.permit))
        self.save()
        return

    def __paypal_create(self, name, payment_methods, mail_address, phone_number, payment_id, payer_id, token):
        self.name = name
        self.permit = self.permit_check(payment_methods)
        self.payment_methods = payment_methods
        self.mail_address = mail_address
        self.phone_number = phone_number
        self.payer_id = payer_id
        self.payment_id = payment_id
        self.token = token
        self.payment_id_hash = encode_sha256(payment_id)
        self.payer_id_hash = encode_sha256(payer_id)
        self.timestamp = str(datetime.datetime.now().timestamp())
        self.joint = encode_sha256(encode_sha256(self.timestamp) + self.payer_id + str(self.permit))
        self.save()

    def read_all(self):
        return self.__class__.objects.all()
