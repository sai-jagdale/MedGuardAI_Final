from django.urls import path
from .views import scan_from_image, scan_from_mobile, scan_from_code

urlpatterns = [
    path('scan/image/', scan_from_image),
    path('scan/mobile/', scan_from_mobile),
    path('scan/code/', scan_from_code),
]