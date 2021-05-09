from rest_framework.response import Response

from Gekidan100WebPage.models.models import Idea, IdeaContents
from Gekidan100WebPage.views.session.app.user import SessionUserAdminWebApp


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


def get_user_data(request, response: Response):
    user_data = SessionUserAdminWebApp(request=request, response=response)
    if user_data.is_login():
        response.data = user_data.get_session()
    return response
