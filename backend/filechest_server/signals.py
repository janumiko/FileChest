from pathlib import Path

from django.db.models.signals import post_delete, pre_save, post_migrate
from django.dispatch import receiver
from django.conf import settings

from .models import Folder, File


@receiver(post_migrate)
def create_root_folder_object(sender, **kwargs):
    """After migrations"""

    try:
        Folder.objects.get(name="root")
    except Folder.DoesNotExist:
        Folder.objects.create(name="root")


@receiver(post_delete, sender=Folder)
def auto_delete_folder_on_delete(sender, instance: Folder, **kwargs):
    """
    Deletes folder from filesystem
    when corresponding `Folder` object is deleted.
    """

    path = Path(settings.MEDIA_ROOT).joinpath(instance.path, instance.name)

    if path.exists() and path.is_dir() and not any(path.iterdir()):
        path.rmdir()


@receiver(post_delete, sender=File)
def auto_delete_file_on_delete(sender, instance: File, **kwargs):
    """
    Deletes file from filesystem
    when corresponding `File` object is deleted.
    """

    path = Path(instance.file.path)

    if path.exists() and path.is_file():
        path.unlink()


@receiver(pre_save, sender=File)
def auto_delete_file_on_change(sender, instance: File, **kwargs):
    """
    Deletes old file from filesystem
    when corresponding `File` object is updated
    with new file.
    """

    if not instance.pk:
        return False

    try:
        old_file = File.objects.get(pk=instance.pk).file
    except File.DoesNotExist:
        return False

    new_file = instance.file

    old_file_path = Path(old_file.file.path)
    if not old_file == new_file and old_file_path.exists() and old_file_path.is_file():
        old_file_path.unlink()
