from django.urls import path
from .views import OCRAPIView

urlpatterns = [
    path("scan/", OCRAPIView.as_view()),
]