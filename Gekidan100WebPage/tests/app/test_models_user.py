from django.test import TestCase
from django.contrib.auth.models import User

from Gekidan100WebPage.models.user import UserData


class TestUserModel(TestCase):

    def setUp(self):
        user = User(username='reoto_kawaguchi', password='reoto_kawaguchi', is_superuser=True)
        user.save()

        user_data = UserData(user=user, introduction='into', profile_image='https://test.com', contract='mail')
        user_data.save()

    def test_is_admin_user(self):

        user_data = UserData.objects.get(user__username='reoto_kawaguchi')
        print(user_data.is_admin_user())
