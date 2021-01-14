from django.contrib.auth.models import Group
from rest_framework.serializers import HyperlinkedModelSerializer
from rest_framework import serializers
from . import models


# class PrimaryKeyRelatedListField(serializers.ListField):
#     def __init__(self, queryset=None, **kwargs):
#         assert queryset is not None, 'queryset must be specified for PrimaryKeyRelatedListField'
#         self.child = serializers.PrimaryKeyRelatedField(queryset=queryset)
#         super().__init__(**kwargs)

#     def get_value(self, dictionary):
#         dictionary = dictionary.copy()

#         keys = []
#         for k, _ in dictionary.items():
#             if k.startswith(f'{self.field_name}['):
#                 keys.append(k)
#         for k in keys:
#             dictionary.appendlist(self.field_name, dictionary.getlist(k)[0])

#         return super().get_value(dictionary)

#     def to_representation(self, data):
#         return super().to_representation(data.all())

class UserSerializer(HyperlinkedModelSerializer):
    avatar = serializers.ImageField(use_url=True)
    following = serializers.PrimaryKeyRelatedField(many=True, read_only=False,queryset=models.User.objects.all())
    followers = serializers.PrimaryKeyRelatedField(many=True, read_only=False,queryset=models.User.objects.all())

    class Meta:
        model = models.User
        fields = ( 'url', 
                    'id', 
                    'email', 
                    'first_name',
                    'last_name', 
                    'password', 
                    'is_superuser',
                    'bio',
                    'avatar',
                    'my_todos',
                    'avatar',
                    'following',
                    'following_count',
                    'followers',
                    'followers_count'
                    )
        extra_kwargs = {
            'url': {
                'view_name': 'users:user-detail',
            },
        }


class GroupSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']
