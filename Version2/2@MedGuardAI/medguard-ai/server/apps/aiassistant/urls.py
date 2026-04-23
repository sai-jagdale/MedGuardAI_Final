from django.urls import path
from .symptom_view import SymptomAPIView

urlpatterns = [
    path('symptoms/', SymptomAPIView.as_view()),
]