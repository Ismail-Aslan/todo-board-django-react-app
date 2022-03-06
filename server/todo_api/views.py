
from .serializers import ColumnSerializer,BoardSerializer,TaskSerializer
from .models import Column,Board,Task
from rest_framework import serializers

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status



@api_view(['GET'])
def tasks(request):
    queryset = Task.objects.all()
    serializer = TaskSerializer(queryset,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def columns(request):
    
    queryset2 = Column.objects.all()
    serializer2 = ColumnSerializer(queryset2,many=True)
    return Response(serializer2.data)

@api_view(['GET'])
def board(request):
    
    queryset3 = Board.objects.all()
    serializer3 = BoardSerializer(queryset3,many=True)
    
    return Response(serializer3.data)

# @api_view(['POST'])
# def postBoard(request):
#     serializer = TodoSerializer(data=request.data)
    
#     if serializer.is_valid():
#         serializer.save()
#     return Response(serializer.data)

# @api_view(['GET','POST'])
# def todoListAll(request):
#     if request.method == "POST":
#         serializer = TodoSerializer(data=request.data)
        
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)    
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
#     elif request.method == "GET":
#         queryset = Todo.objects.all()
#         serializer = TodoSerializer(queryset,many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)
    
# @api_view(['GET','PUT'])
# def todoListUpdate(request,pk):
#     if request.method == "PUT":
#         queryset = Todo.objects.get(id=pk)
#         serializer = TodoSerializer(instance = queryset, data = request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data,status=status.HTTP_202_ACCEPTED)
#         return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)  
      
        
#     elif request.method == "GET":
#         queryset = Todo.objects.get(id=pk)
#         serializer = TodoSerializer(queryset)
#         return Response(serializer.data, status=status.HTTP_200_OK)
      
# @api_view(['DELETE'])
# def todoListDelete(request,pk):
#     if request.method == "DELETE":
#         queryset = Todo.objects.get(id=pk)
#         queryset.delete()
#         return Response("Item deleted",status=status.HTTP_200_OK)  
    
    
# @api_view(['GET','PUT','DELETE'])
# def todoListDetail(request,pk):
#     if request.method == "PUT":
#         queryset = Todo.objects.get(id=pk)
#         serializer = TodoSerializer(instance = queryset, data = request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data,status=status.HTTP_202_ACCEPTED)
#         return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)  
      
        
#     elif request.method == "GET":
#         queryset = Todo.objects.get(id=pk)
#         serializer = TodoSerializer(queryset)
#         return Response(serializer.data, status=status.HTTP_200_OK)
    
#     elif request.method == "DELETE":
#         queryset = Todo.objects.get(id=pk)
#         queryset.delete()
#         return Response("Item deleted",status=status.HTTP_200_OK)  
    