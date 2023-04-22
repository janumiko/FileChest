from django.urls import path

from . import views

urlpatterns = [
    path(r"directory/", views.DirectoryAPIView.as_view()),
    path(r"directory/<path:path>", views.DirectoryAPIView.as_view()),
    path(r"download/directory/<path:url_path>", views.download_directory),
    path(r"download/file/<path:url_path>", views.download_file),
    path(r"view/<path:url_path>", views.view_file),
]
