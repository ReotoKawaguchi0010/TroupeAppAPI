import datetime
import json

from django.contrib.auth.models import User
from rest_framework.response import Response

from Gekidan100WebPage.models.models import Idea, IdeaContents
from Gekidan100WebPage.utils.status_codes import UNAUTHORIZED, OK
from Gekidan100WebPage.utils.util import time_subtraction

def get_idea(request, response: Response, data: dict):
    all_idea_data = Idea.objects.all()
    response_data = []
    for idea_data in all_idea_data:
        idea_content_data = IdeaContents.objects.filter(idea_id=idea_data)
        contents = []
        if bool(idea_content_data):
            for content in idea_content_data:
                contents.append({
                    'name': content.name,
                    'value': content.value,
                })
        idea_data = {
            'title': idea_data.title,
            'author': idea_data.author,
            'contents': contents,
        }
        response_data.append(idea_data)
    response.data = response_data
    return response