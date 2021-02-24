from django.db import models


class VideoTicket(models.Model):
    mail_address = models.CharField(max_length=256)
    payment_id = models.CharField(max_length=256)
    payer_id = models.CharField(max_length=256)
    token = models.CharField(max_length=256)
    payment_id_hash = models.CharField(max_length=70)
    payer_id_hash = models.CharField(max_length=70)
    token_hash = models.CharField(max_length=70)

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
        if self.__class__.objects.filter(title=self.title).exists() and self.__class__.objects.filter(author=self.author):
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
        print(values)
        for _, v in values.items():
            self.name = v['name']
            self.value = v['value']
            self.save()
        return None


