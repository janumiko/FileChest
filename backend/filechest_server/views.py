from pathlib import Path
from shutil import make_archive
from typing import Dict, Tuple

from django.http import FileResponse, HttpRequest
from django.shortcuts import get_object_or_404
from django.conf import settings
from rest_framework import views, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.middleware import csrf
from django.contrib.auth import authenticate

from .serializers import FileSerializer, FolderSerializer, TagSerializer
from .models import Folder, File, Tag


class DirectoryAPIView(views.APIView):
    """
    API endpoint that allows users to view a directory.
    """

    def get(self, request: HttpRequest, url_path: str = ".") -> Response:
        """
        Get a directory.

        Args:
            request: The request object.
            url_path: The path of the directory.

        Returns:
            A list of files and folders.
        """

        path = Path("root").joinpath(url_path.strip("/"))

        get_object_or_404(Folder, path=path.parent, name=path.name)

        folders, files = self.get_folders_and_files(request, path)

        return Response(
            {
                "folders": FolderSerializer(folders, many=True, context={"path": path}).data,
                "files": FileSerializer(files, many=True, context={"path": path}).data,
            }
        )

    def get_folders_and_files(self, request: HttpRequest, path: Path) -> Tuple:
        """
        Get folders and files from the given directory.

        Args:
            request: The request object.
            path: The path of the directory.

        Returns:
            A tuple of folders and files.
        """

        params = self.get_query_params(request, path)

        if "recursive" not in request.query_params:
            folders = Folder.objects.filter(**params).distinct()
        else:
            folders = File.objects.none()

        files = File.objects.filter(**params).distinct()

        return folders, files

    def get_query_params(self, request: HttpRequest, path: Path) -> Dict[str, str]:
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

        if "recursive" in query_params:
            params["path__startswith"] = path
        else:
            params["path"] = path

        return params


class TagsAPIView(views.APIView):
    """API endpoint that allows users to view tags."""

    def get(self, request: HttpRequest) -> Response:
        """
        Get all tags.

        Args:
            request: The request object.

        Returns:
            A list of tags.
        """

        tags = Tag.objects.all()

        return Response(TagSerializer(tags, many=True).data)


class FileView(views.APIView):
    """API endpoint that allows users to view or download a file."""

    def get(self, request: HttpRequest, url_path: str) -> FileResponse:
        """
        Open a file in the browser if possible else download it.

        Args:
            request: The request object.
            url_path: current url path.

        Returns:
            A FileResponse object.
        """

        path = Path("root").joinpath(url_path.strip("/"))
        folder_path = path.parent

        folder = get_object_or_404(Folder, path=folder_path.parent, name=folder_path.name)
        file_object = get_object_or_404(File, parent_folder=folder, name=path.name)

        return FileResponse(file_object.file.open(mode="rb"), "rb")


class DownloadFileView(views.APIView):
    """API endpoint that allows users to download a file."""

    def get(self, request: HttpRequest, url_path: str) -> FileResponse:
        """
        Download a file from the server.

        Args:
            request: The request object.
            url_path: current url path.

        Returns:
            A FileResponse object as an attachment.
        """

        path = Path("root").joinpath(url_path.strip("/"))
        folder_path = path.parent

        folder = get_object_or_404(Folder, path=folder_path.parent, name=folder_path.name)
        file_object = get_object_or_404(File, parent_folder=folder, name=path.name)

        return FileResponse(file_object.file.open(mode="rb"), as_attachment=True)


class DownloadDirectoryView(views.APIView):
    """API endpoint that allows users to download a directory as a zip file."""

    def get(self, request: HttpRequest, url_path: str) -> FileResponse:
        """
        Download a directory as a zip file.

        Args:
            request: The request object.
            url_path: current url path.

        Returns:
            A FileResponse object as an attachment.
        """

        path = Path("root").joinpath(url_path.strip("/"))
        get_object_or_404(Folder, path=path.parent, name=path.name)

        # make archive of folder at path, save it on media folder
        make_archive(
            settings.MEDIA_ROOT.joinpath(path.name), "zip", settings.MEDIA_ROOT.joinpath(path)
        )

        return FileResponse(
            open(settings.MEDIA_ROOT.joinpath(path.name + ".zip"), "rb"), as_attachment=True
        )


def get_tokens_for_user(user) -> Dict[str, str]:
    """
    Get authorization tokens for an user.
    """

    refresh = RefreshToken.for_user(user)

    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }


class LoginView(views.APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request, format=None) -> Response:
        username = request.data.get("username", None)
        password = request.data.get("password", None)
        user = authenticate(username=username, password=password)

        if user is None or not user.is_active:
            return Response(
                {"Invalid": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
            )

        data = get_tokens_for_user(user)

        response = Response()
        response.set_cookie(
            key=settings.SIMPLE_JWT["AUTH_COOKIE"],
            value=data["access"],
            expires=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
            secure=settings.SIMPLE_JWT["AUTH_COOKIE_SECURE"],
            httponly=settings.SIMPLE_JWT["AUTH_COOKIE_HTTP_ONLY"],
            samesite=settings.SIMPLE_JWT["AUTH_COOKIE_SAMESITE"],
        )
        csrf.get_token(request)
        response.data = {"Success": "Login successfully", "data": data}

        return response
