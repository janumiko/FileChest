from django.urls import path
import filechest_server.views as views

urlpatterns = [
    path(r"", views.home),
    path(r"list/", views.list_directory),
    path(r"list/<path:path>", views.list_directory),
    path(r"view/<path:path>", views.view_file),
]
