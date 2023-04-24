from rest_framework import serializers
from .models import Folder, File


class FileSystemItemSerializer(serializers.ModelSerializer):
    class Meta:
        abstract = True
        fields = ["name", "tags"]


class FolderSerializer(FileSystemItemSerializer):
    class Meta(FileSystemItemSerializer.Meta):
        model = Folder


class FileSerializer(FileSystemItemSerializer):
    tags = serializers.StringRelatedField(many=True)

    class Meta(FileSystemItemSerializer.Meta):
        model = File
