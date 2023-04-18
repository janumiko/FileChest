from django.shortcuts import get_object_or_404
from django.views.generic import ListView
from .models import Folder, File
from django.http import FileResponse, HttpRequest, HttpResponse
from django.shortcuts import render
from pathlib import Path
from django.conf import settings


def home(request: HttpRequest) -> HttpResponse:
    return render(request, "home.html")


def list_directory(request: HttpRequest, path: str = ""):
    if path == '':
        path = 'root'
        dirs = Folder.objects.filter(parent=None)
        files = []
    else:
        path = Path(path)

        folder = get_object_or_404(Folder, path=path.parent, name=path.name)
        dirs = Folder.objects.filter(parent=folder)
        files = File.objects.filter(folder=folder)

    return render(
        request,
        "list_directory.html",
        {
            "files": files,
            "dirs": dirs,
            "path": path,
        },
    )


def view_file(request: HttpRequest, path: str):
    path = Path(path)

    folder = get_object_or_404(Folder, path=path.parent.parent, name=path.parent.name)
    file_object = File.objects.get(folder=folder, file__endswith=path.name)

    return FileResponse(file_object.file.open(mode='rb'), "rb")
