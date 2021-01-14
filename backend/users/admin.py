from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from . import models as user_model
from todos import models as todos_model


class ToDoContainerInline(admin.TabularInline):

    model = todos_model.ToDoContainer


@admin.register(user_model.User)
class CustomUserAdmin(UserAdmin):

    inlines = (ToDoContainerInline,)

    fieldsets = UserAdmin.fieldsets + (
        (
            "Custom Profile",{
                "fields": (
                    "avatar",
                    "bio",
                )
            }
        ),
        (
            "Social",{
                "fields":(
                    "following",
                )
            }
        ),
    )

    list_filter = UserAdmin.list_filter

    list_display = (
        "username",
        "email",
        "first_name",
        "last_name",
        "is_active",
        "my_todos",
        "following_count",
        "followers_count"
    )
