from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'directory/(?P<path>.+)', views.DirectoryViewSet, basename='directory')

urlpatterns = [
    path('', include(router.urls)),
    path(r"download/directory/<path:path>", views.download_directory),
    path(r"download/file/<path:path>", views.download_file),
    path(r"view/<path:path>", views.view_file),
]
