import socket


def split_member():
    return


if __name__ == '__main__':
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.connect(('localhost', 50007))
        s.sendall(b'test')