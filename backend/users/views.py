import datetime
from django.contrib.auth.models import Group
from django.core.serializers.json import DjangoJSONEncoder
from django.http import JsonResponse
from rest_framework import viewsets, permissions, response, generics
from rest_framework.authtoken.models import Token
from rest_framework.authtoken import views as authtoken_view
from .serializers import UserSerializer, GroupSerializer
from . import models


class ObtainTokenView(authtoken_view.ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        try:
            # container={}
            # post_data=request.data
            # container['username'] = post_data['username']
            # container['password'] = post_data['password']
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            user = serializer.validated_data['user']
            token, _ = Token.objects.get_or_create(user=user)
            return response.Response({
                'token': token.key,
                'user_id':user.id
                })
        except Exception:
            print("wrong?")
            return response.Response(data="Something went wrong")


class CheckAuthView(generics.CreateAPIView):

    queryset = Token.objects.all()

    def post(self,request):
        try:
            post_data = request.data
            token = post_data['token']
            user_id = int(post_data['user_id'])
            token_obj=Token.objects.get(key=token)
            user_obj=models.User.objects.get(id=user_id)
            if token_obj and token_obj.user.id==user_id:
                if user_obj and user_obj.auth_token.key==token_obj.key and user_obj.auth_token.key==token:
                    return JsonResponse(data={
                        "auth":True,
                        "user_id":user_id,
                        "token":token,
                        "description":"Authorization successful",
                    })
            raise Exception
        except Exception:
            return response.Response(data="Something went wrong")



class SignUpView(generics.CreateAPIView):

    queryset = models.User.objects.all()
    serializer_class = UserSerializer

    def post(self, request):
        try:
            post_data = request.data
            print(post_data['csrfmiddlewaretoken'])
            first_name=post_data['first_name']
            last_name=post_data['last_name']
            email=post_data['email']
            username=email
            password=post_data['password']
            password_confirm=post_data['password_confirm']
            if not password==password_confirm:
                raise Exception
            new_object =models.User(
                username=username,
                first_name=first_name,
                last_name=last_name,
                email=email,
                )
            new_object.set_password(password)
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


    def partial_update(self, request, *args, **kwargs):
        try:
            data=request.data
            following_user_id=data['id']
            following_user=models.User.objects.get(id=following_user_id)
            followed_user_id=int(request.data['following'])
            if(bool(data['data'])):
                following_user.following.add(models.User.objects.get(id=followed_user_id))
                following_user.save()
            else:
                following_user.following.remove(models.User.objects.get(id=followed_user_id))
                following_user.save()
            return response.Response(data="Saved successfully")
        except Exception:
            kwargs['partial'] = True
            return self.update(request, *args, **kwargs)


class PublicUserViewSet(viewsets.ReadOnlyModelViewSet):

    queryset = models.User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer



class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]
