from django.urls import include, path
from rest_framework import routers
from . import views

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.

app_name = "todos"

router = routers.DefaultRouter()
router.register(r'todo', views.TodoViewSet)
router.register(r'todo_container', views.ToDoContainerViewSet)


urlpatterns = [
    path('', include((router.urls))),
]
