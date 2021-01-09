from django.contrib.auth.models import Group
from django.core.serializers.json import DjangoJSONEncoder
from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import UserSerializer, GroupSerializer
from . import models


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = models.User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)

    # def retrieve(self, request, *args, **kwargs):
    #     data = models.User.objects.all()  # 직렬화할 QuerySet
    #     encoder = DjangoJSONEncoder  # DjangoJSONEncoder를 커스튬한 Encoder
    #     # default = True 로서 변환할 데이터의 타입이 dict인지 확인합니다. dict 가 아닐 경우에는 False로 설정해주어야 합니다. QuerySet 은 dict 타입이 아니므로 False로 설정합니다.
    #     safe = False
    #     # 한글 등의 유니코드는 16진수로 표현되므로 이를 False 로 바꿔주면 한글문자가 그대로 출력됩니다.
    #     json_dumps_params = {'ensure_ascii': False}
    #     kwargs = {}
    #     return JsonResponse(data, encoder, safe, json_dumps_params, kwargs)


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]
