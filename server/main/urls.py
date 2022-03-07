from django.shortcuts import render
from django.contrib import admin
from django.urls import include, path, re_path

def render_react(request):
    return render(request, "index.html")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('todo_api.urls')),
    path('user/', include('user_api.urls')),
    re_path(r"^$", render_react),
    re_path(r"^(?:.*)/?$", render_react),
]
