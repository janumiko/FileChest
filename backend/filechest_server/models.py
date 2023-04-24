from pathlib import Path

from django.db import models
from django.conf import settings

from .utils import file_upload_function


class Tag(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.name


class FileSystemItem(models.Model):
    name = models.CharField(max_length=255)
    path = models.CharField(max_length=255, editable=False, default=".")
    parent_folder = models.ForeignKey("Folder", on_delete=models.PROTECT, null=True, blank=True)
    tags = models.ManyToManyField(Tag, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        if self.parent_folder:
            self.path = Path(self.parent_folder.path).joinpath(self.parent_folder.name)
        else:
            self.path = Path(".")
        super().save(*args, **kwargs)


class Folder(FileSystemItem):
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        path = Path(settings.MEDIA_ROOT).joinpath(self.path, self.name)
        path.mkdir(parents=True, exist_ok=True)

    def __str__(self):
        return f"{self.path}/{self.name}"


class File(FileSystemItem):
    name = models.CharField(max_length=255, editable=False)
    file = models.FileField(upload_to=file_upload_function)

    def save(self, *args, **kwargs):
        self.name = self.file.name
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.path}/{self.name}"
