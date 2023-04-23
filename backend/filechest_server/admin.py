from django.contrib import admin

from .models import Folder, File


class FolderAdmin(admin.ModelAdmin):
    list_display = ("name", "path")


admin.site.register(Folder, FolderAdmin)
admin.site.register(File)
