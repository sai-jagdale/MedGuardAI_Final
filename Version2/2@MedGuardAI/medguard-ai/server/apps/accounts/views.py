from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.views import TokenRefreshView as BaseTokenRefreshView
from django.utils import timezone
from rest_framework.response import Response

from .serializers import RegisterSerializer, LoginSerializer, UserProfileSerializer, UpdateProfileSerializer
from .exceptions import success_response


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return success_response(
            data        = RegisterSerializer(user).data,
            message     = 'Account created successfully.',
            status_code = status.HTTP_201_CREATED,
        )


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user    = serializer.validated_data['user']
        refresh = RefreshToken.for_user(user)
        return success_response(
            data = {
                'access':  str(refresh.access_token),
                'refresh': str(refresh),
                'user':    UserProfileSerializer(user).data,
            },
            message = 'Login successful.',
        )


class TokenRefreshView(BaseTokenRefreshView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            return Response({
                'status':    'success',
                'message':   'Token refreshed.',
                'data':      response.data,
                'timestamp': timezone.now().isoformat(),
            }, status=200)
        return response


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh_token = request.data.get('refresh')
        if not refresh_token:
            return Response(
                {'status': 'error', 'message': 'Refresh token is required.', 'error_code': 'VALIDATION_ERROR'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            RefreshToken(refresh_token).blacklist()
        except TokenError:
            return Response(
                {'status': 'error', 'message': 'Token is invalid or already blacklisted.', 'error_code': 'INVALID_TOKEN'},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return success_response(message='Logged out successfully.')


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return success_response(
            data    = UserProfileSerializer(request.user).data,
            message = 'Profile retrieved.',
        )


class UpdateProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        serializer = UpdateProfileSerializer(instance=request.user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return success_response(
            data    = UserProfileSerializer(user).data,
            message = 'Profile updated successfully.',
        )