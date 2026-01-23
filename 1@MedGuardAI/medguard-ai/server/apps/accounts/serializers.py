# Import serializer tools from DRF
from rest_framework import serializers

# Import Django's built-in User model
from django.contrib.auth.models import User
# Imports for Login JWT
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

class RegisterSerializer(serializers.ModelSerializer):
    """
    This serializer:
    - Accepts incoming JSON data
    - Validates it
    - Creates a new User object
    """
    # Password field:
    # write_only=True → password will NOT appear in API responses
    # min_length=6 → basic security check
    password = serializers.CharField(write_only=True, min_length=6)
    class Meta:
        """
        Meta tells Django:
        - Which model we are using
        - Which fields are allowed from request
        """
        model = User
        fields = ['username', 'email', 'password']
    def create(self, validated_data):
        """
        This method runs AFTER data is validated.
        validated_data = {
            'username': 'sai123',
            'email': 'sai@test.com',
            'password': 'test@123'
        }
        """
        # create_user() automatically:
        # - hashes the password
        # - saves user to database
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user
    
class LoginSerializer(serializers.Serializer):
    """
    Handles:
    - Credential validation
    - JWT token generation
    """
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    def validate(self, data):
        """This method runs when serializer.is_valid() is called"""
        # Authenticate user using Django auth system
        user = authenticate(
            username=data['username'],
            password=data['password']
        )
        # If authentication fails
        if user is None:
            raise serializers.ValidationError("Invalid username or password")
        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        return {
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "username": user.username
        }
