from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny


class RegisterView(APIView):
    permission_classes = [AllowAny]   # 🔥 THIS LINE IS CRITICAL

    def post(self, request):
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")

        if User.objects.filter(username=username).exists():
            return Response(
                {"error": "Username already exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        User.objects.create_user(
            username=username,
            email=email,
            password=password,
        )

        return Response(
            {"message": "User created successfully"},
            status=status.HTTP_201_CREATED,
        )