from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'file/(?P<path>.+)', views.DirectoryViewSet, basename='file')

urlpatterns = [
    path('', include(router.urls)),
]
