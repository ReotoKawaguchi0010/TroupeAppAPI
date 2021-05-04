from rest_framework.response import Response

from Gekidan100WebPage.views.home_page import get
from Gekidan100WebPage.views.home_page import post


def main(request, response: Response):
    if request.method == 'GET':
        response = get.main(request, response)
    elif request.method == 'POST':
        response = post.main(request, response)
    return response
