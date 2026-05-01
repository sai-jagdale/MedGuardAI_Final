import os
from .llm_normalization_service import normalize_with_llm

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


class NormalizeAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        raw_text = request.data.get("raw_text")

        if not raw_text:
            return Response({"error": "raw_text is required"}, status=400)

        # 🔥 USE YOUR NEW KEY
        api_key = os.environ.get("GEMINI_API_KEY_FOR_EXTRACTION")

        if not api_key:
            return Response({"error": "Gemini API key missing"}, status=500)

        try:
            structured_data = normalize_with_llm(api_key, raw_text)

            return Response({
                "agent": "normalization_llm",
                "status": "success",
                "structured_data": structured_data,
                "medicine_name_for_rag": structured_data.get("medicine_name", "")
            })

        except Exception as e:
            return Response({
                "status": "error",
                "message": str(e)
            }, status=500)