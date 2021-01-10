import datetime
from django.contrib.auth.models import Group
from django.core.serializers.json import DjangoJSONEncoder
from django.http import JsonResponse
from rest_framework import viewsets, permissions, response, generics
from .serializers import UserSerializer, GroupSerializer
from . import models

class SignUpView(generics.CreateAPIView):

    queryset = models.User.objects.all()
    serializer_class = UserSerializer

    def post(self, request):
        try:
            post_data = request.data
            first_name=post_data['first_name']
            last_name=post_data['last_name']
            email=post_data['email']
            username=email
            password=post_data['password']
            new_object =models.User(
                username=username,
                password=password,
                first_name=first_name,
                last_name=last_name,
                email=email,
                )
            new_object.save()
            return response.Response(data="Saved successfully")
        except Exception:
            return JsonResponse(code=500, data="Internal Server Error")


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = models.User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)



class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]
