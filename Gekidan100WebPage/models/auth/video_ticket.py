import datetime
import secrets


def ord_letter(letters):
    texts = ''
    letters = [ord(letter) for letter in letters]
    for t  in letters:
        texts += str(t)
    return hex(int(texts))





class VideoTicketCrypt(object):
    def __init__(self):
        self.payment_id =''
        self.payer_id = ''
        self.token = ''
        self.payment_id_hash = ''
        self.payer_id_hash = ''


    def create(self, name_letter: str, mail_address_letter: str):
        self.token = secrets.token_hex()
        name = ord_letter(name_letter)
        print(name)
        mail_address = ord_letter(mail_address_letter)
        print(mail_address)
        return False


if __name__ == '__main__':
    test = VideoTicketCrypt().create('河口 怜和人', 'zimao@futsu100.com')
    print(test)