from rest_framework import serializers
from .models import FileTagModel, FolderModel, FileModel
from rest_framework.utils.serializer_helpers import ReturnDict

class DirectorySerializer(serializers.ModelSerializer):
    folders = serializers.SerializerMethodField()
    files = serializers.SerializerMethodField()

    class Meta:
        model = FolderModel
        fields = ["name", "folders", "files"]

    @staticmethod
    def get_folders(obj: FolderModel) -> list:
        return [folder.name for folder in obj.folders.all()]

    @staticmethod
    def get_files(obj: FolderModel) -> ReturnDict:
        files = obj.files.all()
        serializer = FileSerializer(files, many=True)
        return serializer.data


class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = FolderModel
        fields = ["name"]


class FileSerializer(serializers.ModelSerializer):
    filename = serializers.SerializerMethodField()
    tags = serializers.SerializerMethodField()
    size = serializers.SerializerMethodField()

    class Meta:
        model = FileModel
        fields = ["filename", "tags", "size"]

    @staticmethod
    def get_filename(obj: FileModel) -> str:
        return obj.filename()

    @staticmethod
    def get_tags(obj: FileModel) -> list:
        return [tag.name for tag in obj.tags.all()]

    @staticmethod
    def get_size(obj: FileModel) -> int:
        return obj.file.size


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileTagModel
        fields = ["name"]
