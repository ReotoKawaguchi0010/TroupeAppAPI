from rest_framework.response import Response

from Gekidan100WebPage.models.performance import Peformance, Schedule
from Gekidan100WebPage.models.performance import Performance_Schedule
from Gekidan100WebPage.models.performance import Budget


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

def post_budget(request, response: Response, data: dict):
    performance_id = data['performanceId']
    full_budget = data['fullBudget']
    username = data['username']
    budget = Budget(item='test', price=300)
    budget.create(performance_id=performance_id, full_budget=full_budget, username=username)
    return response



def upload_file(request, response: Response, data: dict):
    return response