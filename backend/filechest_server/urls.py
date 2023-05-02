from django.urls import path

from . import views

urlpatterns = [
    path(r"directory/", views.DirectoryAPIView.as_view()),
    path(r"directory/<path:url_path>", views.DirectoryAPIView.as_view()),
    path(
        r"download/directory/<path:url_path>",
        views.DownloadDirectoryView.as_view(),
    ),
    path(r"download/file/<path:url_path>", views.DownloadFileView.as_view()),
    path(r"view/<path:url_path>", views.FileView.as_view()),
    path(r"tags/", views.TagsAPIView.as_view()),
    path(r"login/", views.LoginView.as_view(), name="login"),
]
