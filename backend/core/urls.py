from django.urls import include, path
from . import views as core_view

app_name = "core"

urlpatterns = [
    path("", core_view.TemporaryView.as_view(), name="temporary")
]
