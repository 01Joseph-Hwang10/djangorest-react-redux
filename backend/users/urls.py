from django.urls import include, path
from rest_framework import routers
from rest_framework.authtoken import views
from . import views as backend_view

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
router = routers.DefaultRouter()
router.register(r'users', backend_view.UserViewSet)

app_name = "users"

urlpatterns = [
    path('', include(router.urls)),
    path('api-token-auth/', views.obtain_auth_token,name="api_token_auth"),
    path('sign-up/',backend_view.SignUpView.as_view(),name="sign_up")
]
