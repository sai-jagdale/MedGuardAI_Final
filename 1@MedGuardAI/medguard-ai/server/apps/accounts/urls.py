# Used to define URL paths
from django.urls import path

# Import the view
from .views import RegisterView, LoginView

urlpatterns = [
    # When client hits /register/,
    # Django calls RegisterView
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
]
