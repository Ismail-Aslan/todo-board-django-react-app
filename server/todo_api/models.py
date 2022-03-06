from django.db import models
from django.contrib.postgres.fields import ArrayField

class Task(models.Model):
    id = models.TextField(blank=True,primary_key=True)
    content = models.TextField(null=True,blank=True)
    tags = ArrayField( models.TextField(null=True,blank=True))
    assignedTo = models.TextField(null=True,blank=True)
    color = models.TextField(null=True,blank=True)
   
    def __str__(self):
        return f"{self.id} {self.content}"

class Column(models.Model):
    id = models.TextField(blank=True,primary_key=True)
    title = models.TextField(null=True,blank=True)
    taskIds = ArrayField( models.TextField(null=True,blank=True))
    
    def __str__(self):
        return f"{self.id} {self.title}"
    
class Board(models.Model):
    columnOrder= ArrayField( models.TextField(null=True,blank=True))
    
    def __str__(self):
        return f"{self.order}"
    
