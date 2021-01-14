from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

# @receiver(post_save, sender=settings.AUTH_USER_MODEL)
# def create_auth_token(sender, instance=None, created=False, **kwargs):
#     if created:
#         Token.objects.create(user=instance)


class User(AbstractUser):

    bio = models.TextField(max_length=200,blank=True,null=True)
    avatar = models.ImageField(blank=True, null=True, upload_to="avatars",default='avatars/person-icon.png')

    class Meta:
        abstract = False

    def my_todos(self):
        return int(len(self.todo_container.all()))
