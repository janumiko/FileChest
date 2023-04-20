from pathlib import Path
from shutil import make_archive

from django.http import Http404, FileResponse, HttpRequest
from django.shortcuts import get_object_or_404
from django.conf import settings
from rest_framework import viewsets

from .models import FolderModel, FileModel
from .serializers import DirectorySerializer


class DirectoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows users to view a directory.
    """

    serializer_class = DirectorySerializer

    def get_queryset(self):
        path = Path(self.kwargs["path"])

        folder = FolderModel.objects.filter(path=path.parent, name=path.name)

        if len(folder) == 0:
            raise Http404

        return folder


def view_file(request: HttpRequest, path: str) -> FileResponse:
    """
    Open a file in the browser if possible else download it.

    Args:
        request: The request object.
        path: The relative path to the file.

    Returns:
        A FileResponse object.
    """

    path = Path(path)
    folder_path = path.parent

    folder = get_object_or_404(FolderModel, path=folder_path.parent, name=folder_path.name)
    file_object = get_object_or_404(FileModel, folder=folder, file__endswith=path.name)

    return FileResponse(file_object.file.open(mode="rb"), "rb")


def download_directory(request: HttpRequest, path: str) -> FileResponse:
    """
    Download a directory as a zip file.

    Args:
        request: The request object.
        path: The relative path to the directory.

    Returns:
        A FileResponse object as an attachment.
    """

    path = Path(path)
    make_archive(settings.MEDIA_ROOT.joinpath(path.name), "zip", path)

    return FileResponse(
        open(settings.MEDIA_ROOT.joinpath(path.name + ".zip"), "rb"), as_attachment=True
    )


def download_file(request: HttpRequest, path: str) -> FileResponse:
    """
    Download a file from the server.

    Args:
        request: The request object.
        path: The relative path to the file.

    Returns:
        A FileResponse object as an attachment.
    """

    path = Path(path)
    folder_path = path.parent

    folder = get_object_or_404(FolderModel, path=folder_path.parent, name=folder_path.name)
    file_object = get_object_or_404(FileModel, folder=folder, file__endswith=path.name)

    return FileResponse(file_object.file.open(mode="rb"), as_attachment=True)
