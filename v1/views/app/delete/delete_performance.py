from v1.models import Idea
from v1.models.performance import PerformanceScript, Peformance

def delete_idea(request, response, data):
    if 'title' in data and 'author' in data:
        title = data['title']
        author = data['author']
        idea = Idea.read_util(title=title, author=author)
        idea.delete()
    return response


def delete_script(request, response, data):
    performance_id = data['performance_id']
    performance = Peformance(id=performance_id)
    performance_script = PerformanceScript(performance=performance)
    performance_script.delete()
    return response