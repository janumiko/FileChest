from pathlib import Path
from shutil import make_archive

from django.http import Http404, FileResponse, HttpRequest
from django.shortcuts import get_object_or_404
from django.conf import settings
from rest_framework import views
from rest_framework.response import Response

from .serializers import FileSerializer, FolderSerializer
from .models import FileSystemItem, Folder, File


class DirectoryViewSet(views.APIView):
    """
    API endpoint that allows users to view a directory.
    """
    authentication_classes = []
    permission_classes = []

    def get(self, request, path="."):
        """
        Get a directory.

        Args:
            request: The request object.
            path: The path of the directory.

        Returns:
            A list of files and folders.
        """

        path = Path("root").joinpath(path)

        get_object_or_404(Folder, path=path.parent, name=path.name)

        folders = Folder.objects.filter(path=path)
        files = File.objects.filter(path=path)

        return Response(
            {
                "folders": FolderSerializer(folders, many=True).data,
                "files": FileSerializer(files, many=True).data,
            }
        )


def view_file(request: HttpRequest, url_path: str) -> FileResponse:
    """
    Open a file in the browser if possible else download it.

    Args:
        request: The request object.
        url_path: current url path.

    Returns:
        A FileResponse object.
    """

    path = Path(url_path)
    folder_path = path.parent

    folder = get_object_or_404(Folder, path=folder_path.parent, name=folder_path.name)
    file_object = get_object_or_404(File, folder=folder, file__endswith=path.name)

    return FileResponse(file_object.file.open(mode="rb"), "rb")


def download_directory(request: HttpRequest, url_path: str) -> FileResponse:
    """
    Download a directory as a zip file.

    Args:
        request: The request object.
        url_path: current url path.

    Returns:
        A FileResponse object as an attachment.
    """

    path = Path(url_path)
    make_archive(str(settings.MEDIA_ROOT.joinpath(path.name)), "zip", path)

    return FileResponse(
        open(settings.MEDIA_ROOT.joinpath(path.name + ".zip"), "rb"), as_attachment=True
    )


def download_file(request: HttpRequest, url_path: str) -> FileResponse:
    """
    Download a file from the server.

    Args:
        request: The request object.
        url_path: current url path.

    Returns:
        A FileResponse object as an attachment.
    """

    path = Path(url_path)
    folder_path = path.parent

    folder = get_object_or_404(Folder, path=folder_path.parent, name=folder_path.name)
    file_object = get_object_or_404(File, folder=folder, file__endswith=path.name)

    return FileResponse(file_object.file.open(mode="rb"), as_attachment=True)
