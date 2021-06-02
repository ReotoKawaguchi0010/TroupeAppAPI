from django.test import TestCase

from v1.models.user import UserData


class TestUserModel(TestCase):

    def setUp(self):
        UserData().create_user(username='reoto_kawaguchi', email='test@test.com', password='reoto_pass',
                               introduction='int', profile_image='https://test.com', contract='test@test.com')

    def test_is_admin_user(self):
        user_data = UserData().login('reoto_kawaguchi', 'reoto_pass')

        if user_data is not None:
            user_data.pprint()

        self.assertIsNotNone(user_data)
