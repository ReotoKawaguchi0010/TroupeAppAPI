import datetime
import json

from rest_framework.response import Response

from Gekidan100WebPage.models.performance import Peformance, Cast, Staff, Schedule

def post_performance(request, response: Response, data: dict):
    if bool(data['title']):
        performance = Peformance(title=data['title'])
        performance.save()
    return response