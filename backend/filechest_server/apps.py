from django.apps import AppConfig


class FileChestServerConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "filechest_server"

    def ready(self):
        pass
