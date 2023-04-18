from django.apps import AppConfig


class FilechestServerConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'filechest_server'

    def ready(self):
        import filechest_server.signals
