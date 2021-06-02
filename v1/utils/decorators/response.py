from rest_framework.response import Response

from v1.utils.http import is_port_local_content_type


def json_response(**dkwargs):
    def decorator(func):
        def wrapper(*args, **kwargs):
            newkwargs = {**kwargs, **dkwargs}
            content_type = is_port_local_content_type(*args, **kwargs)
            response = Response(newkwargs, content_type=content_type)
            newargs = ((args[0]), (response))
            response = func(*newargs, **kwargs)
            return response
        return wrapper
    return decorator








