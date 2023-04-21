from pathlib import Path

from django.db import models
from django.conf import settings

from .utils import file_upload_function


class FileTagModel(models.Model):
    """
    A model to store the tags for the files.
    """

    name = models.CharField(max_length=255, unique=True)

    def __str__(self) -> str:
        return self.name


class FolderModel(models.Model):
    """
    A model to store information about the structure of the folders.
    """

    name = models.CharField(max_length=255)
    path = models.CharField(max_length=255, editable=False, default=".")
    parent = models.ForeignKey(
        "self", on_delete=models.PROTECT, null=True, blank=True, related_name="subfolders"
    )
    folders = models.ManyToManyField(
        "self", blank=True, related_name="parent_folders", symmetrical=False, editable=False
    )
    files = models.ManyToManyField("FileModel", blank=True, editable=False)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=["name", "path"], name="unique_name_for_path")
        ]

    def save(self, *args, **kwargs):
        if self.parent is not None:
            self.path = Path(self.parent.path).joinpath(self.parent.name)

        path = Path(settings.MEDIA_ROOT).joinpath(self.path, self.name)
        path.mkdir(parents=True, exist_ok=True)

        super().save(*args, **kwargs)

        if self.parent is not None:
            self.parent.folders.add(self)
            self.parent.save()

    def __str__(self):
        return f"{self.path}\\{self.name}"


class FileModel(models.Model):
    """
    A model to store the files.
    """

    file = models.FileField(upload_to=file_upload_function)
    folder = models.ForeignKey(FolderModel, on_delete=models.PROTECT)
    tags = models.ManyToManyField(FileTagModel, blank=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.folder.files.add(self)
        self.folder.save()

    def filename(self) -> str:
        return Path(self.file.name).name

    def __str__(self):
        return self.file.name
