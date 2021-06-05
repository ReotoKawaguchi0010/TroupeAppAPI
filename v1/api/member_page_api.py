from v1.config import REOTO_USER
from v1.config import REOTO_PASS


def is_login_check(username, password):
    if username == REOTO_USER and password == REOTO_PASS:
        return True
    return False
