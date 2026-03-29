from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import VerificationLog

# Create your views here.
class VerificationHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        logs = VerificationLog.objects.filter(user=request.user).order_by('-created_at')[:20]

        data = []
        for log in logs:
            data.append({
                "medicine": log.medicine.name,
                "input_type": log.input_type,
                "result": log.result,
                "time": log.created_at
            })

        return Response(data)