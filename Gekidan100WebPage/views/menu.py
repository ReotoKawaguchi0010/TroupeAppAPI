from django.shortcuts import HttpResponse

def routing_in_menu(request):
    if 'overview' in request.path:
        return overview(request)
    elif 'schedule' in request.path:
        return schedule(request)
    elif 'ticket' in request.path:
        return ticket(request)
    return

def overview(request):
    if request.method == 'GET':
        return {'page': 'Coming soon'}

def schedule(request):
    if request.method == 'GET':
        return {'page': 'Coming soon'}

def ticket(request):
    if request.method == 'GET':
        return {'page': 'Coming soon'}


