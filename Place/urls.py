from django.conf.urls import url
from . import views
from django.urls import include, path

urlpatterns = [
    url(r'^$', views.home),
    path('inputColor/', views.updatePixelColor),
]
