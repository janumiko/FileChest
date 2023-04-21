from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r"directory/(?P<path>.+)", views.DirectoryViewSet, basename="directory")

urlpatterns = [
    path(r"directory/", views.DirectoryViewSet.as_view({"get": "list"})),
    path(r"directory/<path:path>", views.DirectoryViewSet.as_view({"get": "list"})),
    path(r"download/directory/<path:url_path>", views.download_directory),
    path(r"download/file/<path:url_path>", views.download_file),
    path(r"view/<path:url_path>", views.view_file),
]
