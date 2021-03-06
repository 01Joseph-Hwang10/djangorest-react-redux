from rest_framework.serializers import HyperlinkedModelSerializer, HyperlinkedRelatedField
from . import models as todo_model
from rest_framework.serializers import ReadOnlyField, ImageField
from users import models as user_model


class ToDoContainerSerializer(HyperlinkedModelSerializer):
    created_by = ReadOnlyField(source='created_by.id')
    created_username = ReadOnlyField(source="created_by.username")
    get_created_by_avatar = ImageField(use_url=True)

    class Meta:
        model = todo_model.ToDoContainer
        fields = (
            'url', 
            'id',
            'created',
            'updated',
            'created_by',
            'created_username',
            'get_created_by_avatar',
            'todos_name',
            'todos_important',
            'todos_items_count',
            'get_todo_items',
            'todos_description',
        )
        extra_kwargs = {
            'url': {
                'view_name': 'todos:todocontainer-detail',
            },
        }



class ToDoSerializer(HyperlinkedModelSerializer):
    to_do_belongs = ReadOnlyField(source='to_do_belongs.id')

    class Meta:
        model = todo_model.ToDo
        fields = (
            'url', 'id',
            'created',
            'updated',
            'to_do_belongs',
            'to_do_name',
            'to_do_description',
            'to_do_order',
            'to_do_completed',
        )
        extra_kwargs = {
            'url': {
                'view_name': 'todos:todo-detail',
            },
        }

