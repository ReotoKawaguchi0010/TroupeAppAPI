from rest_framework.response import Response

from Gekidan100WebPage.models.performance import Schedule, Cast, Performance_Schedule, Peformance, Staff


def get_performance(request, response: Response, data: dict):
    if bool(data['data']):
        if data['data'] == 'all':
            performance = Peformance.objects.all()
            titles = [{'id': i.id,'title': i.title} for i in performance]
            response.data = titles
    return response