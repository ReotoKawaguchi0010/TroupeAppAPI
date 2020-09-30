from django.shortcuts import HttpResponse


def routing_in_member(request, user):
    if 'script' in request.path:
        return script(request, user)
    elif 'top_page' in request.path:
        return top_page(request, user)
    elif 'money' in request.path:
        return money(request, user)
    return False


def script(request, user):
    return {'message': f'hello {user}', 'bool': 1,}

def top_page(request, user):
    output = {'message': f'hello {user}', 'bool': 1,}
    return output

def money(request, user):
    output = {'message': f'hello {user}', 'bool': 1}
    return output