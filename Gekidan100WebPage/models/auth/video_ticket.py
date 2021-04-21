class VideoTicketCrypt(object):
    def __init__(self):
        self.payment_id =''
        self.payer_id = ''
        self.token = ''
        self.payment_id_hash = ''
        self.payer_id_hash = ''


    def create(self, name, mail_address):
        return False


if __name__ == '__main__':
    test = VideoTicketCrypt().create('河口 怜和人', 'zimao@futsu100.com')
    print(test)