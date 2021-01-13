from django.contrib.auth.models import Group
from rest_framework.serializers import HyperlinkedModelSerializer
from . import models


class UserSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = models.User
        fields = ('url', 'id', 'email', 'first_name',
                  'last_name', 'password', 'is_superuser','bio','avatar')
        extra_kwargs = {
            'url': {
                'view_name': 'users:user-detail',
            },
        }


class GroupSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']
