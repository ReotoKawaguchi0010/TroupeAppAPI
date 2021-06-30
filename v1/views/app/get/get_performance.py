from rest_framework.response import Response

from v1.models.performance import PerformanceSchedule
from v1.models.performance import Peformance
from v1.models.performance import PerformanceScript
from v1.models.performance import Budget, FullBudget
from v1.models.user import User


def get_script(request, response: Response, data: dict):
    if 'performanceId' in data and 'scriptNum' in data:
        performance_id = int(data['performanceId'])
        script_num = int(data['scriptNum'])
        script = PerformanceScript().json_read(performance_id, script_num, 0)
        response.data = script
    return response

def get_performance(request, response: Response, data: dict):
    if 'data' in data:
        if data['data'] == 'all':
            performances = Peformance.objects.all()
            titles = [{'id': performance.id,'title': performance.title, 'performance_date': performance.performance_date} for performance in performances]
            response.data = titles
        else:
            performance_id = int(data['data'])
            if Peformance.objects.filter(id=performance_id).exists():
                performance = Peformance.objects.get(id=performance_id)
                response.data = {'id': performance.id, 'title': performance.title}
    return response


def get_schedule(response: Response, data: dict):
    performance_id = int(data['performanceId'])
    performance = Peformance.objects.filter(id=performance_id)
    response_data = []
    if performance.exists():
        performance_schedule = PerformanceSchedule.objects.filter(performance=performance[0])
        if performance_schedule.exists():
            for p in performance_schedule:
                p: PerformanceSchedule = p
                event_data = {
                    'start': p.schedule.start,
                    'end': p.schedule.end,
                    'description': p.schedule.description,
                    'title': p.schedule.title,
                }
                response_data.append(event_data)
    response.data = response_data
    return response

def get_budget(request, response: Response, data: dict):
    performance_id = int(data['performanceId'])
    budget = Budget().read(performance_id)
    response.data = budget
    return response

def get_users(request, response: Response, data: dict):
    users = User().read_all()
    response.data = users
    return response

