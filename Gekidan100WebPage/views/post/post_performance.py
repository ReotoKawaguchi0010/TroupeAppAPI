from rest_framework.response import Response

from Gekidan100WebPage.models.performance import Peformance, Schedule
from Gekidan100WebPage.models.performance import Performance_Schedule


def post_performance(request, response: Response, data: dict):
    if bool(data['title']):
        performance = Peformance(title=data['title'])
        performance.save()
    return response

def post_schedule(request, response: Response, data: dict):
    performance_id = data['performanceId']
    performance = Peformance.objects.filter(id=performance_id)
    if bool(performance):
        schedule = Schedule(title=data['title'], description=data['description'],
                            start=data['startTime'], end=data['endTime'])
        schedule.save()
        performance = performance[0]
        performance_schedule = Performance_Schedule(performance=performance, schedule=schedule)
        performance_schedule.save()
    return response


def upload_file(request, response: Response, data: dict):

    return response