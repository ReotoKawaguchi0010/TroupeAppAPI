from django.db import models


class Idea(models.Model):
    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=256)
    author = models.CharField(max_length=256)

    @classmethod
    def read_util(cls, **kwargs):
        if cls.objects.filter(**kwargs).exists():
            return cls.objects.filter(**kwargs)
        return False

    def exist(self):
        return self.__class__.objects.filter(title=self.title).exists()

    def create(self):
        if not self.exist():
            self.save()
        return None

    def read(self):
        if self.__class__.objects.filter(title=self.title).exists() and \
                self.__class__.objects.filter(author=self.author):
            return self.__class__.objects.get(title=self.title, author=self.author)
        return False

    def delete(self, using=None, keep_parents=False):
        if self.__class__.objects.filter(title=self.title).exists():
            idea = self.__class__.objects.get(title=self.title)
            return idea
        return False


class IdeaContents(models.Model):
    name = models.CharField(max_length=256)
    value = models.CharField(max_length=256)
    idea_id = models.ForeignKey(Idea, on_delete=models.CASCADE)

    @classmethod
    def read(cls, **kwargs):
        if cls.objects.filter(**kwargs).exists():
            idea = cls.objects.get(**kwargs)
            return idea
        return False

    def exist(self):
        return self.__class__.objects.filter(idea_id=self.idea_id).exists()

    def create(self, title, author, values: dict):
        idea = Idea(title=title, author=author)
        if not idea.exist():
            idea.create()
        self.idea_id = idea.read()
        print(self.idea_id.title)
        for _, v in values.items():
            self.name = v['name']
            self.value = v['value']
            self.save()
        return None

    def dict(self):
        data = self.__class__.objects.filter(idea_id=self.idea_id)
        data = [{'name': v.name, 'value': v.value} for v in data]
        return {
            'title': self.idea_id.title,
            'author': self.idea_id.author,
            'item_values': data,
        }
