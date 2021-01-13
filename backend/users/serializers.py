from django.contrib.auth.models import Group
from rest_framework.serializers import HyperlinkedModelSerializer
from rest_framework import serializers
from . import models


class UserSerializer(HyperlinkedModelSerializer):
    avatar = serializers.ImageField(use_url=True)

    class Meta:
        model = models.User
        fields = ('url', 'id', 'email', 'first_name',
                  'last_name', 'password', 'is_superuser',
                  'bio','avatar','my_todos','avatar')
        extra_kwargs = {
            'url': {
                'view_name': 'users:user-detail',
            },
        }


class GroupSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']
