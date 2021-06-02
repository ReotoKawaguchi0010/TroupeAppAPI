from v1.config.config import REOTO_USER, REOTO_PASS

def is_login_check(username, password):
    if username == REOTO_USER and password == REOTO_PASS:
        return True
    return False