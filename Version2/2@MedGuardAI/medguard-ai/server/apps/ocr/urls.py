from django.urls import path
from .views import OCRAPIView
from .normalization_view import NormalizeAPIView

urlpatterns = [
    path("scan/", OCRAPIView.as_view()),
    path("normalize/", NormalizeAPIView.as_view()),
]