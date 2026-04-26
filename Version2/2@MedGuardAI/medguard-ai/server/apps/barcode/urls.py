from django.urls import path
from .views import BarcodeScanAPIView

urlpatterns = [
    path("scan/", BarcodeScanAPIView.as_view()),
]