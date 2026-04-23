from django.urls import path
from .views import (
    VerificationHistoryView
)

urlpatterns = [
    path('history/', VerificationHistoryView.as_view()),
]