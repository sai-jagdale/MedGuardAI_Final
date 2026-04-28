from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .vision_service import extract_text_from_image


class OCRAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        image = request.FILES.get("image")

        if not image:
            return Response({"error": "Image required"}, status=400)

        text = extract_text_from_image(image)

        if not text:
            return Response({"error": "Text extraction failed"}, status=500)

        return Response({
            "extracted_text": text
        })