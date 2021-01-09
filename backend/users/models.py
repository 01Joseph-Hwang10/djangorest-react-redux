from django.contrib.auth.models import AbstractUser
from rest_framework.authtoken.models import Token


class User(AbstractUser):

    class Meta:
        abstract = False

    def my_todos(self):
        return int(len(self.todo_container.all()))
