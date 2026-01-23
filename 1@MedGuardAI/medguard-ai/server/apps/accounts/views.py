# HTTP status codes (201, 400, etc.)
from rest_framework import status

# Used to send JSON responses
from rest_framework.response import Response

# Base class for API endpoints
from rest_framework.views import APIView

# Import the serializer we created
from .serializers import RegisterSerializer
from .serializers import LoginSerializer

class RegisterView(APIView):
    """
    Handles POST request for user registration
    URL: /api/auth/register/
    """

    def post(self, request):
        """Runs when a POST request is sent to this endpoint request.data contains JSON sent by client"""
        # Pass incoming JSON data to serializer
        serializer = RegisterSerializer(data=request.data)
        # Validate incoming data
        if serializer.is_valid():
            # Calls serializer.create()
            serializer.save()
            # Send success response
            return Response(
                {"message": "User registered successfully"},
                status=status.HTTP_201_CREATED
            )
        # If validation fails, send errors
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

class LoginView(APIView):
    """
    Handles POST request for login
    URL: /api/auth/login/
    """
    def post(self, request):
        """Runs when client sends username & password"""
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            # serializer.validated_data contains tokens
            return Response(serializer.validated_data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)