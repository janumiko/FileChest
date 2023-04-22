import rest_framework_filters as filters

from .models import FolderModel


class DirectoryFilter(filters.FilterSet):
    """
    A FilterSet class to filter the FolderModel by the name of a file in its files field.
    """
    class Meta:
        model = FolderModel
        fields = {
            "name": ["exact"]
        }
