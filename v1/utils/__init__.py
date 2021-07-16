import hashlib
import datetime


def encode_sha256(encode_letter):
    s256 = hashlib.sha256(encode_letter.encode('utf-8')).hexdigest()
    return s256


def change_oct_bit(bin_data: str):
    bin_data = bin_data.replace('0b', '')
    if len(bin_data) < 8:
        minus = 8 - len(bin_data)
        plus_str = ''
        for i in range(minus):
            plus_str += '0'
        return plus_str + bin_data
    elif len(bin_data) > 8:
        raise Exception
    return bin_data


def xor_bin(bin1, bin2):
    bin1: str = change_oct_bit(bin1)
    bin2: str = change_oct_bit(bin2)
    result = ''
    for i in range(8):
        result += str(int(bin1[i]) ^ int(bin2[i]))
    return result


def my_cipher_ec(keys, value, option):
    to_xor = ''
    to_xor_list = []
    for i in range(64):
        hash_key = bin(ord(keys[i]))
        letter = bin(ord(value[i]))
        if option == 'encode':
            to_xor = xor_bin(hash_key, letter)
        elif option == 'decode':
            to_xor = xor_bin(letter, hash_key)
        to_xor_list.append(to_xor)
    return ''.join(to_xor_list)


def my_cipher_encode(m: str):
    from v1.config import CIPHER_KEY
    hash_ms = encode_sha256(m)
    hash_keys = encode_sha256(CIPHER_KEY)
    return my_cipher_ec(hash_keys, hash_ms, 'encode')


def my_cipher_decode(c: str):
    from v1.config import CIPHER_KEY
    hash_keys = encode_sha256(CIPHER_KEY)
    return my_cipher_ec(hash_keys, c, 'decode')


def is_port_local_content_type(request):
    if int(request.get_port()) == 8000:
        return 'text/html'
    return 'application/json'


def time_subtraction(time: datetime.datetime):
    _time_subtraction = datetime.datetime.now() - time
    return _time_subtraction.seconds


def has_request_type(request_data, has_data):
    if 'type' in request_data:
        return has_data == request_data['type']
    return False
