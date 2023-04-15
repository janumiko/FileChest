from django.http import Http404, HttpRequest
from django.conf import settings


def get_path(request: HttpRequest, path: str):
    # change path from absolute to relative path
    if path and path[0] == "/":
        path = ""

    request_path = settings.MEDIA_ROOT.joinpath(path)

    if not request_path.exists():
        raise Http404()

    return request_path
