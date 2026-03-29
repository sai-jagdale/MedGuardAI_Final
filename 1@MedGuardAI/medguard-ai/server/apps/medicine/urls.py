from django.urls import path
from .views import (
    MedicineSearchView,
    MedicineDetailView,
    MedicineBarcodeView,
    VerificationHistoryView
)

urlpatterns = [
    path('search/', MedicineSearchView.as_view()),
    path('barcode/<str:barcode>/', MedicineBarcodeView.as_view()),
    path('history/', VerificationHistoryView.as_view()),
    path('<int:pk>/', MedicineDetailView.as_view()),
]