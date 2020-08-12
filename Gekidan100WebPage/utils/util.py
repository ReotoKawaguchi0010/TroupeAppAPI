import hashlib

def encode_sha256(encode_letter):
    s256 = hashlib.sha256(encode_letter.encode('utf-8')).hexdigest()
    return s256


if __name__ == '__main__':
    pass