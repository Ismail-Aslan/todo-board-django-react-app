from django.urls import path
from .views import tasks,columns,board


urlpatterns = [
    path('tasks', tasks),
    path('columns', columns),
    path('board', board),
   
]