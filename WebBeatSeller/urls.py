from django.urls import path
from . import views
from django.views.generic.base import RedirectView

urlpatterns = [
    path('', views.index, name='index'),
    path('api/albums/<int:album_id>/', views.album_detail, name='album_detail'),
]
