from django.db import models


class PerformanceVideoList(models.Model):
    performance_num = models.IntegerField(unique=True)
    item_name = models.CharField(max_length=100)
    top_image = models.URLField()
    release_date = models.DateField()
    price = models.IntegerField()
    payment_methods = models.TextField()  # jsonデータ ["paypal", "振り込み"]
    synopsis = models.TextField()
    images = models.TextField()  # jsonデータ [{"url": "test.com", "title": "text"}, {"url": "test.com", "title": "text"}]

    def create(self, data: dict):
        if self.has_performance_video_list(data):
            self.performance_num = data['performance_num']
            self.item_name = data['item_name']
            self.top_image = data['top_image']
            self.release_date = data['release_date']
            self.price = data['price']
            self.payment_methods = data['payment_methods']
            self.synopsis = data['synopsis']
            self.images = data['images']
            self.save()

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
