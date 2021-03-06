from django.urls import include, path
from rest_framework import routers
# from rest_framework.authtoken import views
from . import views as user_view

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
router = routers.DefaultRouter()
router.register(r'users', user_view.UserViewSet)
router.register(r'public_users', user_view.PublicUserViewSet)

app_name = "users"

urlpatterns = [
    path('', include(router.urls)),
    path('api-token-auth/', user_view.ObtainTokenView.as_view(),name="api_token_auth"),
    path('sign-up/',user_view.SignUpView.as_view(),name="sign_up"),
    path('check-auth/',user_view.CheckAuthView.as_view(),name="check-auth"),
]
