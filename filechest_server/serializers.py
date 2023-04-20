from rest_framework import serializers
from .models import FileTagModel, FolderModel, FileModel


class DirectorySerializer(serializers.ModelSerializer):
    subfolders = serializers.SerializerMethodField()
    files = serializers.SerializerMethodField()

    class Meta:
        model = FolderModel
        fields = ['name', 'subfolders', 'files']

    def get_subfolders(self, obj):
        return [folder.name for folder in obj.subfolders.all()]

    def get_files(self, obj):
        files = obj.files.all()
        serializer = FileSerializer(files, many=True)
        return serializer.data


class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = FolderModel
        fields = ['name']


class FileSerializer(serializers.ModelSerializer):
    filename = serializers.SerializerMethodField()
    tags = serializers.SerializerMethodField()
    size = serializers.SerializerMethodField()

    class Meta:
        model = FileModel
        fields = ['filename', 'tags', 'size']

    def get_filename(self, obj):
        return obj.filename()

    def get_tags(self, obj):
        return [tag.name for tag in obj.tags.all()]

    def get_size(self, obj):
        return obj.file.size


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileTagModel
        fields = ['name']
