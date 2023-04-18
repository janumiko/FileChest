from django.contrib import admin
from .models import File, Folder


class FolderAdmin(admin.ModelAdmin):
    list_display = ('name', 'path')


admin.site.register(File)
admin.site.register(Folder, FolderAdmin)

# Register your models here.
