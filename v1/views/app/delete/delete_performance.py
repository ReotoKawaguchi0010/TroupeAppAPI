from rest_framework.response import Response

from v1.models import Idea
from v1.models.performance import PerformanceScript
from v1.models.performance import Peformance

def delete_idea(response: Response, data: dict):
    if 'title' in data and 'author' in data:
        title = data['title']
        author = data['author']
        idea = Idea.read_util(title=title, author=author)
        idea.delete()
    return response


def delete_script(response: Response, data: dict):
    performance_id = data['performance_id']
    performance = Peformance(id=performance_id)
    performance_script = PerformanceScript(performance=performance)
    performance_script.delete()
    return response

def delete_performance(response: Response, data: dict):
    if 'title' in data:
        title = data['title']
        performance = Peformance()
        is_delete = performance.delete_from_title(title=title)
        if is_delete:
            response.data =  {
                'bool': True,
                'message': 'delete is success',
            }
    return response