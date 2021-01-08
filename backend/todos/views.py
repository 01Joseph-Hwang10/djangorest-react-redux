import datetime
from rest_framework import viewsets, generics
from rest_framework import permissions, viewsets, response
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

    def create(self, request): # Here is the new update comes <<<<
        post_data = request.data
        print(post_data)
        id=int(models.ToDo.objects.count()) + int(1)
        to_do_belongs=post_data['to_do_belongs']
        to_do_name=post_data['to_do_name']
        to_do_description=post_data['to_do_description']
        to_do_completed=False
        to_do_order=post_data['to_do_order']
        created=datetime.datetime.now()
        updated=created
        print(created)
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
        print(new_object)
        new_object.save()
        return response.Response(data="Saved successfully")


class ToDoContainerViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows ToDoContainers to be viewed or edited.
    """
    queryset = models.ToDoContainer.objects.all().order_by('created')
    serializer_class = ToDoContainerSerializer
