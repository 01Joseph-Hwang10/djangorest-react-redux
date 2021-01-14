from django.urls import include, path
from rest_framework import routers
from . import views

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.

app_name = "todos"

router = routers.DefaultRouter()
router.register(r'todo', views.ToDoViewSet)
router.register(r'todo_container', views.ToDoContainerViewSet)
router.register(r'public_todo', views.PublicToDoViewSet)
router.register(r'public_todo_container', views.PublicToDoContainerViewSet)


urlpatterns = [
    path('', include((router.urls))),
    # path('todoC', views.ToDoCAPIView.as_view(),name="todoC"),
    # path('todoRUD', views.ToDoRUDAPIView.as_view(),name="todoRUD"),
]
