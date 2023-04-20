from django.contrib import admin

from .models import FileModel, FolderModel, FileTagModel


class FolderAdmin(admin.ModelAdmin):
    list_display = ('name', 'path')


admin.site.register(FileModel)
admin.site.register(FolderModel, FolderAdmin)
admin.site.register(FileTagModel)

