from pyexpat import model
from rest_framework import serializers
from .models import Board,Column,Task

class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields =['columnOrder']
        
class ColumnSerializer(serializers.ModelSerializer):
    class Meta:
        model = Column
        fields = '__all__'
        
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
