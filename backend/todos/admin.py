from django.contrib import admin
from . import models


@admin.register(models.ToDo)
class ToDoAdmin(admin.ModelAdmin):

    list_display = (
        "to_do_name",
        "to_do_description",
        "to_do_belongs",
        "to_do_order",
    )


@admin.register(models.ToDoContainer)
class ToDoContainerAdmin(admin.ModelAdmin):

    list_display = (
        "todos_name",
        "todos_items_count",
        "created_by",
        "todos_important",
    )
