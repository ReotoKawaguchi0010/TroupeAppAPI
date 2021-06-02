import datetime
import secrets


class VideoTicketCrypt(object):
    def __init__(self):
        self.payment_id = ''
        self.payer_id = ''
        self.token = ''
        self.payment_id_hash = ''
        self.payer_id_hash = ''

    @staticmethod
    def ord_letter(letters):
        texts = ''
        letters = [ord(letter) for letter in letters]
        for t in letters:
            texts += str(t)
        return hex(int(texts))

    def create(self, name_letter: str, mail_address_letter: str):
        self.token = secrets.token_hex()
        name = self.ord_letter(name_letter)
        mail_address = self.ord_letter(mail_address_letter)
        return False
