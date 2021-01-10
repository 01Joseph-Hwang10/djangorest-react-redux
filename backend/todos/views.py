import datetime, json
from rest_framework import viewsets, generics
from rest_framework import permissions, viewsets, response
from django.http import HttpResponse, JsonResponse
from . import models
from .serializers import ToDoSerializer, ToDoContainerSerializer


# class ToDoCAPIView(generics.ListCreateAPIView):

#     queryset = models.ToDo.objects.all()
#     serializer_class = ToDoSerializer

# class ToDoRUDAPIView(generics.RetrieveUpdateDestroyAPIView):
    
#     queryset = models.ToDo.objects.all()
#     serializer_class = ToDoSerializer


class ToDoViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Todos to be viewed or edited.
    """
    queryset = models.ToDo.objects.all()
    serializer_class = ToDoSerializer

    def create(self, request):
        try:
            post_data = request.data
            id=int(models.ToDo.objects.count()) + int(1)
            to_do_belongs=post_data['to_do_belongs']
            to_do_name=post_data['to_do_name']
            to_do_description=post_data['to_do_description']
            to_do_completed=False
            to_do_order=post_data['to_do_order']
            created=datetime.datetime.now()
            updated=created
            new_object =models.ToDo(
                id,
                created,
                updated,
                to_do_belongs,
                to_do_name,
                to_do_description,
                to_do_completed,
                to_do_order,
                )
            new_object.save()
            return response.Response(data="Saved successfully")
        except Exception:
            return JsonResponse(code=500, data="Internal Server Error")

    def partial_update(self, request,pk,format):
        try:
            data = request.data
            data_id = int(data['id'])
            data_type = str(data['type'])
            patching_object = list(models.ToDo.objects.filter(id=data_id).values())[0]
            patching_object[data_type]=data['data']
            patching_object['updated']= datetime.datetime.now()
            new_object =models.ToDo(
                id=patching_object['id'],
                created=patching_object['created'],
                updated=patching_object['updated'],
                to_do_belongs_id=patching_object['to_do_belongs_id'],
                to_do_name=patching_object['to_do_name'],
                to_do_description=patching_object['to_do_description'],
                to_do_completed=patching_object['to_do_completed'],
                to_do_order=patching_object['to_do_order'],
                )
            new_object.save()
            return response.Response(data="Saved successfully")
        except Exception:
            return JsonResponse(code=500, data="Internal Server Error")



class ToDoContainerViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows ToDoContainers to be viewed or edited.
    """
    queryset = models.ToDoContainer.objects.all().order_by('created')
    serializer_class = ToDoContainerSerializer
