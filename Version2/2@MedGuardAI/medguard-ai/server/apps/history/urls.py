from django.urls import path
from .views import ChatSessionListAPIView
from .views import ChatMessagesAPIView 
from .views import ChatSessionListAPIView

urlpatterns = [
    path("sessions/", ChatSessionListAPIView.as_view()),
    path("messages/<int:session_id>/", ChatMessagesAPIView.as_view()),
    path("sessions/", ChatSessionListAPIView.as_view()),
]