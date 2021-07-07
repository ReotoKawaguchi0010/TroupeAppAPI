import datetime
import re

from django.db import models


class PerformanceVideoList(models.Model):
    performance_num = models.IntegerField(unique=True)
    item_name = models.CharField(max_length=100)
    release_date = models.CharField(max_length=15)
    top_image = models.URLField()
    price = models.IntegerField()
    payment_methods = models.TextField()  # jsonデータ ["paypal", "振り込み"]
    synopsis = models.TextField()
    images = models.TextField()  # jsonデータ [{"url": "test.com", "title": "text"}, {"url": "test.com", "title": "text"}]

    @staticmethod
    def has_performance_video_list(data: dict):
        return data.keys() >= {
            'performance_num',
            'item_name',
            'top_image',
            'release_date',
            'price',
            'payment_methods',
            'synopsis',
            'images',
        }

    @staticmethod
    def date_parse(value: datetime.date) -> str:
        return str(value)

    @staticmethod
    def date_loads(value: str or tuple) -> datetime.date or None:
        if isinstance(value, tuple):
            value = value[0]

        if re.match(r'(^[0-9]{4})-([0-9]{2})-([0-9]{2}$)', value):
            value = value.replace('-', '')
            y = int(value[0:4])
            m = int(value[4:6])
            d = int(value[6:8])
            return datetime.date(year=y, month=m, day=d)
        return None

    def create(self, performance_num, item_name, top_image,
               release_date, price, payment_methods, synopsis, images):
        self.performance_num = performance_num
        self.item_name = item_name
        self.top_image = top_image
        self.release_date = release_date
        self.price = price
        self.payment_methods = payment_methods
        self.synopsis = synopsis
        self.images = images
        self.save()
        return self

    def dict(self):
        return {
            'performance_num': self.performance_num,
            'item_name': self.item_name,
            'top_image': self.top_image,
            'release_date': self.date_loads(self.release_date),
            'price': self.price,
            'payment_methods': self.payment_methods,
            'synopsis': self.synopsis,
            'images': self.images
        }

    def read_all(self):
        return [item.dict() for item in self.__class__.objects.all()]

    def read(self, performance_num):
        data = self.__class__.objects.filter(performance_num=performance_num)
        if data.exists():
            item: PerformanceVideoList = data[0]
            return item.dict()
        return None
