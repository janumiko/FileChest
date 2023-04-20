from rest_framework import viewsets
from .models import FolderModel
from .serializers import DirectorySerializer
from django.http import Http404
from pathlib import Path


class DirectoryViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = DirectorySerializer

    def get_queryset(self):
        path = Path(self.kwargs['path'])

        folder = FolderModel.objects.filter(path=path.parent, name=path.name)

        if len(folder) == 0:
            raise Http404

        return folder
