from django.db import models
from core.models import TimeStampedModel
from django.core.validators import MinValueValidator, MaxValueValidator
from users import models as user_model


class ToDoContainer(TimeStampedModel):

    created_by = models.ForeignKey(
        user_model.User, on_delete=models.CASCADE, related_name="todo_container")
    todos_name = models.CharField(max_length=50)
    todos_important = models.BooleanField(default=False)

    def todos_items_count(self):
        todo_items = len(self.todo.all())
        return int(todo_items)

    def __str__(self):
        return str(self.todos_name)


class ToDo(TimeStampedModel):

    to_do_belongs = models.ForeignKey(
        ToDoContainer, on_delete=models.CASCADE, related_name="todo")
    to_do_name = models.CharField(max_length=50)
    to_do_description = models.TextField(null=True, blank=True)
    to_do_completed = models.BooleanField(default=False)
    to_do_order = models.IntegerField(validators=[MinValueValidator(1), ])

    def __str__(self):
        suffix = "th"
        if int(self.to_do_order) % 10 == 1:
            suffix = "st"
        elif int(self.to_do_order) % 10 == 2:
            suffix = "nd"
        elif int(self.to_do_order) % 10 == 3:
            suffix = "rd"
        return f"{self.to_do_name} - {self.to_do_order}{suffix}"
