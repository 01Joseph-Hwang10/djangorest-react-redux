import json
from django.forms.models import model_to_dict
from django.db import models
from core.models import TimeStampedModel
from django.core.validators import MinValueValidator, MaxValueValidator
from users import models as user_model


class ToDoContainer(TimeStampedModel):

    created_by = models.ForeignKey(
        user_model.User, on_delete=models.CASCADE, related_name="todo_container")
    todos_name = models.CharField(max_length=50)
    todos_important = models.BooleanField(default=False)
    todos_description = models.TextField(blank=True,null=True,default="No description")

    def get_created_by_avatar(self):
        return self.created_by.avatar

    def get_todo_items(self):
        todo_items = []
        get_todo_items = self.todo.all()
        for item in get_todo_items:
            todo_item = {
                "id": int(),
                "to_do_name": str(),
                "to_do_description": str(),
                "to_do_completed": bool(),
                "to_do_order": int(),
            }
            todo_item["id"] = item.id
            todo_item["to_do_name"] = item.to_do_name
            todo_item["to_do_description"] = item.to_do_description
            todo_item["to_do_completed"] = item.to_do_completed
            todo_item["to_do_order"] = item.to_do_order
            todo_items.append(todo_item)
        return todo_items

    def todos_items_count(self):
        todo_items_count = len(self.todo.all())
        return int(todo_items_count)

    def __str__(self):
        return str(self.todos_name)


class ToDo(TimeStampedModel):

    to_do_belongs = models.ForeignKey(
        ToDoContainer, on_delete=models.CASCADE, related_name="todo")
    to_do_name = models.CharField(max_length=50)
    to_do_description = models.TextField(null=True, blank=True)
    to_do_completed = models.BooleanField(default=False)
    to_do_order = models.IntegerField(validators=[MinValueValidator(1), ])
