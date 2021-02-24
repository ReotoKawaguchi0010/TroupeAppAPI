from Gekidan100WebPage.models import Idea


def delete_idea(request, response, data):
    if 'title' in data and 'author' in data:
        title = data['title']
        author = data['author']
        idea = Idea.read_util(title=title, author=author)
        idea.delete()
    return response