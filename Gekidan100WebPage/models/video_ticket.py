import datetime

from django.db import models

from Gekidan100WebPage.utils.util import encode_sha256

class VideoTicket(models.Model):
    permit = models.BooleanField(null=True)
    payment_methods = models.CharField(max_length=256)
    mail_address = models.CharField(max_length=256)
    payment_id = models.CharField(max_length=256)
    payer_id = models.CharField(max_length=256)
    token = models.CharField(max_length=256)
    payment_id_hash = models.CharField(max_length=70)
    payer_id_hash = models.CharField(max_length=70)
    timestamp = models.CharField(max_length=128)
    joint = models.CharField(max_length=256)


    def permit_check(self, payment_methods):
        if payment_methods == 'paypal':
            return True
        return False

    def create(self, payment_methods, mail_address, payment_id, payer_id, token):
        self.permit = self.permit_check(payment_methods)
        self.payment_methods = payment_methods
        self.mail_address = mail_address
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