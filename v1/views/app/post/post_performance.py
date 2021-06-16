from rest_framework.response import Response

from v1.models.performance import Peformance
from v1.models.performance import Schedule
from v1.models.performance import PerformanceSchedule
from v1.models.performance import Budget
from v1.models.performance_video_list import PerformanceVideoList


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
        performance_schedule = PerformanceSchedule(performance=performance, schedule=schedule)
        performance_schedule.save()
    return response

def post_budget(request, response: Response, data: dict):
    performance_id = data['performanceId']
    full_budget = data['fullBudget']
    username = data['username']
    budget = Budget()
    if 'item' in data and 'price' in data:
        budget.item = data['item']
        budget.price = data['price']
    budget.create(performance_id=performance_id, full_budget=full_budget, username=username)
    return response

def post_sale(request, response: Response, data: dict):
    data = data['send_data']
    video_list = PerformanceVideoList().create(data)
    response.data = {
        'status': 200,
        'data': video_list.dict()
    }
    return response



def upload_file(request, response: Response, data: dict):
    return response