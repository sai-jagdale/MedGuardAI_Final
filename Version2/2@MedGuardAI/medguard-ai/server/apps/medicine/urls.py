from django.urls import path
from .views import verify_medicine_text

urlpatterns = [
    path('verify/text/', verify_medicine_text),
]