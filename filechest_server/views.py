import markdown

from shutil import make_archive
from django.http import FileResponse, HttpRequest, HttpResponse
from django.shortcuts import render
from .utils import get_path
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt


# Create your views here.
def home(request: HttpRequest) -> HttpResponse:
    return render(request, "home.html")


def list_directory(request: HttpRequest, path: str = ""):
    request_path = get_path(request, path)
    directory = [f for f in request_path.iterdir()]

    hidden_files = [f.name for f in directory if f.is_file() and f.name[0] == "."]
    hidden_directories = [f.name for f in directory if f.is_dir() and f.name[0] == "."]
    files = [f.name for f in directory if f.is_file() and f.name not in hidden_files]
    directories = [f.name for f in directory if f.is_dir() and f.name not in hidden_directories]

    return render(
        request,
        "list_directory.html",
        {
            "hidden_files": hidden_files,
            "hidden_directories": hidden_directories,
            "files": files,
            "directories": directories,
            "path": path,
        },
    )


def download_directory(request: HttpRequest, path: str):
    request_path = get_path(request, path)
    make_archive(settings.MEDIA_ROOT.joinpath(request_path.name), "zip", request_path)

    return FileResponse(
        open(settings.MEDIA_ROOT.joinpath(request_path.name + ".zip"), "rb"), as_attachment=True
    )


def download_file(request: HttpRequest, path: str):
    request_path = get_path(request, path)

    return FileResponse(open(request_path, "rb"), as_attachment=True)


def view_file(request: HttpRequest, path: str):
    request_path = get_path(request, path)
    file_type = path[path.rindex(".") + 1 :]

    if file_type.lower() == "md":
        file = open(request_path, "r")
        html = markdown.markdown(file.read(), extensions=["extra"])
        return render(request, "markdown.html", {"markdown": html})
    else:
        return FileResponse(open(request_path, "rb"))


@csrf_exempt
def add_file(request: HttpRequest, path: str):
    request_path = get_path(request, path)

    if request.method == "POST":
        file = request.FILES["file"].open()

        request_path = request_path.joinpath(file.name)
        with request_path.open(mode="wb") as f:
            f.write(file.read())

        return HttpResponse("Done")
    else:
        return HttpResponse("Wrong request method!")
