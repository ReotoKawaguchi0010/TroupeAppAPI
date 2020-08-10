import socket

def socket_server():
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(('localhost', 50007))
        s.listen()
        while True:
            conn, addr = s.accept()
            print(s)
            print(conn)
            print(addr)