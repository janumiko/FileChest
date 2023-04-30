from pathlib import Path

from rest_framework import serializers
from .models import Folder, File, Tag


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["name"]


class FileSystemItemSerializer(serializers.ModelSerializer):
    relative_path = serializers.SerializerMethodField("_relative_path")

    class Meta:
        abstract = True
        fields = ["name", "tags", "relative_path"]

    def _relative_path(self, obj):
        path = self.context.get("path")
        object_path = Path(obj.path)
        return str(object_path.relative_to(path))


class FolderSerializer(FileSystemItemSerializer):
    class Meta(FileSystemItemSerializer.Meta):
        model = Folder


class FileSerializer(FileSystemItemSerializer):
    tags = serializers.StringRelatedField(many=True)

    class Meta(FileSystemItemSerializer.Meta):
        model = File
