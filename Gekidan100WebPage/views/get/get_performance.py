from rest_framework.response import Response

from Gekidan100WebPage.models.performance import Schedule, Cast, Performance_Schedule, Peformance, Staff


def get_performance(request, response: Response, data: dict):
    if bool(data['data']):
        if data['data'] == 'all':
            performances = Peformance.objects.all()
            titles = [{'id': performance.id,'title': performance.title} for performance in performances]
            response.data = titles
        else:
            performance_id = int(data['data'])
            if Peformance.objects.filter(id=performance_id).exists():
                performance = Peformance.objects.get(id=performance_id)
                response.data = {'id': performance.id, 'title': performance.title}
    return response


def get_schedule(request, response: Response, data: dict):
    performance_id = int(data['performanceId'])
    performance = Peformance.objects.filter(id=performance_id)
    response_data = []
    if bool(performance):
        performance_schedule = Performance_Schedule.objects.filter(performance=performance[0])
        if bool(performance_schedule):
            for p in performance_schedule:
                p: Performance_Schedule = p
                event_data = {
                    'start': p.schedule.start,
                    'end': p.schedule.end,
                    'description': p.schedule.description,
                    'title': p.schedule.title,
                }
                response_data.append(event_data)
    response.data = response_data
    return response