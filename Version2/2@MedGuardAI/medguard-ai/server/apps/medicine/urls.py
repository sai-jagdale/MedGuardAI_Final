from django.urls import path
from .views import TextGoogleSearchView

urlpatterns = [
    path("text-google-search/", TextGoogleSearchView.as_view()),
]