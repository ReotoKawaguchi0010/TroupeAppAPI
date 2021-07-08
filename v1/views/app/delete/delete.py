from rest_framework.response import Response

from v1.models.performance_video_list import PerformanceVideoList


def delete_performance_list(response: Response, data: dict):
    if 'performance_num' in data:
        performance_num = int(data['performance_num'])
        p = PerformanceVideoList()
        response.data = {
            'bool': p.delete_at_performance_num(performance_num),
        }
    return response
