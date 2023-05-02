from pathlib import Path

from rest_framework import serializers
from .models import Folder, File, Tag


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["name"]


class FileSystemItemSerializer(serializers.ModelSerializer):
    relative_path = serializers.SerializerMethodField("_relative_path")
    size = serializers.SerializerMethodField("_size")

    class Meta:
        abstract = True
        fields = ["name", "tags", "relative_path", "size"]

    def _relative_path(self, obj):
        path = self.context.get("path")
        object_path = Path(obj.path)
        # if relative path is the same as path, return empty string
        if object_path == path:
            return ""
        return str(object_path.relative_to(path))

    def _size(self, obj):
        if hasattr(obj, "file"):
            return obj.file.size
        return 0


class FolderSerializer(FileSystemItemSerializer):
    class Meta(FileSystemItemSerializer.Meta):
        model = Folder


class FileSerializer(FileSystemItemSerializer):
    tags = serializers.StringRelatedField(many=True)

    class Meta(FileSystemItemSerializer.Meta):
        model = File
