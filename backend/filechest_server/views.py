from pathlib import Path
from shutil import make_archive

from django.http import FileResponse, HttpRequest
from django.shortcuts import get_object_or_404
from django.conf import settings
from rest_framework import views
from rest_framework.response import Response

from .serializers import FileSerializer, FolderSerializer
from .models import Folder, File


class DirectoryAPIView(views.APIView):
    """
    API endpoint that allows users to view a directory.
    """

    def get(self, request: HttpRequest, path: str = "."):
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

        folders, files = self.get_folders_and_files(request, path)

        return Response(
            {
                "folders": FolderSerializer(folders, many=True, context={"path": path}).data,
                "files": FileSerializer(files, many=True, context={"path": path}).data,
            }
        )

    def get_folders_and_files(self, request: HttpRequest, path: Path) -> tuple:
        """
        Get folders and files from the given directory.

        Args:
            request: The request object.
            path: The path of the directory.

        Returns:
            A tuple containing a queryset of folders and a queryset of files.
        """

        params = self.get_query_params(request, path)

        if "include-subfolders" not in request.query_params:
            folders = Folder.objects.filter(**params)
        else:
            folders = File.objects.none()

        files = File.objects.filter(**params)

        return folders, files

    def get_query_params(self, request: HttpRequest, path: Path) -> dict:
        """
        Get the query params from the request.

        Args:
            request: The request object.
            path: The path of the directory.

        Returns:
            A dict of query params.
        """

        query_params = request.query_params
        params = {}

        if "tags" in query_params:
            params["tags__name__in"] = query_params.getlist("tags")

        if "name" in query_params:
            params["name__icontains"] = query_params.get("name")

        if "include-subfolders" in query_params:
            params["path__startswith"] = path
        else:
            params["path"] = path

        return params


def view_file(request: HttpRequest, url_path: str) -> FileResponse:
    """
    Open a file in the browser if possible else download it.

    Args:
        request: The request object.
        url_path: current url path.

    Returns:
        A FileResponse object.
    """

    path = Path("root").joinpath(url_path)
    folder_path = path.parent

    folder = get_object_or_404(Folder, path=folder_path.parent, name=folder_path.name)
    file_object = get_object_or_404(File, parent_folder=folder, name=path.name)

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

    path = Path("root").joinpath(url_path)
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

    path = Path("root").joinpath(url_path)
    folder_path = path.parent

    folder = get_object_or_404(Folder, path=folder_path.parent, name=folder_path.name)
    file_object = get_object_or_404(File, parent_folder=folder, name=path.name)

    return FileResponse(file_object.file.open(mode="rb"), as_attachment=True)
