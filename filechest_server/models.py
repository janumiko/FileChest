from pathlib import Path

from django.db import models
from django.conf import settings

from .utils import file_upload_function


class Folder(models.Model):
    name = models.CharField(max_length=255)
    path = models.CharField(max_length=255, editable=False, default='.')
    parent = models.ForeignKey('self', on_delete=models.PROTECT, null=True, blank=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['name', 'path'], name='unique_name_for_path')
        ]

    def save(self, *args, **kwargs):
        if self.parent is not None:
            self.path = Path(self.parent.path).joinpath(self.parent.name)

        path = Path(settings.MEDIA_ROOT).joinpath(self.path, self.name)
        path.mkdir(parents=True, exist_ok=True)

        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.path}\\{self.name}'


class File(models.Model):
    folder = models.ForeignKey(Folder, on_delete=models.PROTECT)
    file = models.FileField(upload_to=file_upload_function)

    def filename(self):
        return Path(self.file.name).name

    def __str__(self):
        return self.file.name


