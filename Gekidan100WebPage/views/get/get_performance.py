from rest_framework.response import Response

from Gekidan100WebPage.models.performance import Schedule, Cast, Performance_Schedule, Peformance, Staff


def get_performance(request, response: Response, data: dict):
    if bool(data['data']):
        if data['data'] == 'all':
            performances = Peformance.objects.all()
            titles = [{'id': performance.id,'title': performance.title} for performance in performances]
            response.data = titles
    return response