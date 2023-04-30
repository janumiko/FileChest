from django.contrib import admin

from .models import Folder, File, Tag


class FolderAdmin(admin.ModelAdmin):
    list_display = ("name", "path")


class FileAdmin(admin.ModelAdmin):
    list_display = ("name", "path")


admin.site.register(Folder, FolderAdmin)
admin.site.register(File, FileAdmin)
admin.site.register(Tag)
