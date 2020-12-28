import hashlib
import random


def encode_sha256(encode_letter):
    s256 = hashlib.sha256(encode_letter.encode('utf-8')).hexdigest()
    return s256



def change_oct_bit(bin: str):
    bin = bin.replace('0b', '')
    if len(bin) < 8:
        minus = 8 - len(bin)
        plus_str = ''
        for i in range(minus):
            plus_str += '0'
        return plus_str + bin
    elif len(bin) > 8:
        raise Exception
    return bin

def xor_bin(bin1, bin2):
    bin1: str = change_oct_bit(bin1)
    bin2: str = change_oct_bit(bin2)
    result = ''
    for i in range(8):
        result += str(int(bin1[i]) ^ int(bin2[i]))
    return result

def my_cipher_encode(m: str):
    from Gekidan100WebPage.config.config import CIPHER_KEY
    hash_ms = encode_sha256(m)
    hash_keys = encode_sha256(CIPHER_KEY)
    c_list = []
    for i in range(64):
        hash_m = bin(ord(hash_ms[i]))
        hash_key = bin(ord(hash_keys[i]))
        c = xor_bin(hash_key, hash_m)
        c_list.append(chr(int(c, 2)))

    return ''.join(c_list)

def my_cipher_decode(c: str):
    from Gekidan100WebPage.config.config import CIPHER_KEY
    hash_keys = encode_sha256(CIPHER_KEY)
    m_list = []
    for i in range(64):
        hash_key = bin(ord(hash_keys[i]))
        bin_c = bin(ord(c[i]))
        m = xor_bin(bin_c, hash_key)
        m_list.append(chr(int(m, 2)))
    return ''.join(m_list)

def is_port_local_content_type(request):
    if int(request.get_port()) == 8000:
        return 'text/html'
    return 'application/json'




if __name__ == '__main__':
    str1 = 'PAYID-L67255A76683099VG284801U'
    str2 = 'ZQFR8L8CNFDC6'

    encode = my_cipher_encode(str1)
    decode = my_cipher_decode(encode)
    print(decode == encode_sha256(str1))


