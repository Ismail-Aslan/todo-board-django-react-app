
from .serializers import ColumnSerializer,BoardSerializer,TaskSerializer
from .models import Column,Board,Task
from rest_framework import serializers

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status



@api_view(['GET','POST'])
def tasks(request):
    if request.method == "GET":
        queryset = Task.objects.all()
        serializer = TaskSerializer(queryset,many=True)
        return Response(serializer.data)
    else:
        all_rows = Task.objects.all()
        serializer=TaskSerializer(all_rows,many=True)
        data = serializer.data.copy()
        existing = []
        for x in data:
            existing.append(x.pop("id"))
           
        for key in existing:
            if key in [*request.data.keys()]:
                # update
                queryset = Task.objects.get(id=key)
                serializer = TaskSerializer(instance = queryset, data = request.data[key])
                if serializer.is_valid():
                    serializer.save()
            else:
                # delete
                queryset = Task.objects.get(id=key)
                queryset.delete()
            if serializer.errors:
                print(serializer.errors)
                
        for key in [*request.data.keys()]:
            if not (key in existing):
                serializer = TaskSerializer(data=request.data[key])
                if serializer.is_valid():
                    print(2)
                    serializer.save()
                if serializer.errors:
                    print(serializer.errors)
        return Response("ok")
    

@api_view(['GET','POST'])
def columns(request):
    if request.method == "GET":
        queryset2 = Column.objects.all()
        serializer2 = ColumnSerializer(queryset2,many=True)
        return Response(serializer2.data)
    else:
        all_rows = Column.objects.all()
        serializer=ColumnSerializer(all_rows,many=True)
        data = serializer.data.copy()
        existing = []
        for x in data:
            existing.append(x.pop("id"))  
        for key in existing:
            if key in [*request.data.keys()]:
                # update
                queryset = Column.objects.get(id=key)
                serializer = ColumnSerializer(instance = queryset, data = request.data[key])
                if serializer.is_valid():
                    serializer.save()
            else:
                # delete
                queryset = Column.objects.get(id=key)
                queryset.delete()
            if serializer.errors:
                print(serializer.errors)
                
        for key in [*request.data.keys()]:
            if not (key in existing):
                serializer = ColumnSerializer(data=request.data[key])
                if serializer.is_valid():
                    serializer.save()
                if serializer.errors:
                    print(serializer.errors)
        return Response("ok")
    
@api_view(['GET','POST'])
def board(request):
    if request.method == "GET":
        queryset3 = Board.objects.all()
        serializer3 = BoardSerializer(queryset3,many=True)
        return Response(serializer3.data)
    else:
        queryset = Board.objects.all()
        if queryset :
            queryset = Board.objects.get()
            serializer = BoardSerializer(instance = queryset, data = request.data)
        else:
            serializer = BoardSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

        if serializer.errors:
            print(serializer.errors)
        return Response("ok")

