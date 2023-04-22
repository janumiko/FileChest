from rest_framework import serializers
from .models import Folder, File, FileSystemItem


class FileSystemItemSerializer(serializers.ModelSerializer):
    class Meta:
        abstract = True
        fields = ['name']


class FolderSerializer(FileSystemItemSerializer):
    class Meta(FileSystemItemSerializer.Meta):
        model = Folder


class FileSerializer(FileSystemItemSerializer):
    tags = serializers.StringRelatedField(many=True)

    class Meta(FileSystemItemSerializer.Meta):
        model = File
        fields = FileSystemItemSerializer.Meta.fields + ['tags']
