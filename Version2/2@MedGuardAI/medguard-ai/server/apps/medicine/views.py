from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from ai_agents.web_agent import get_web_data

# 🌐 TEXT GOOGLE SEARCH API
class TextGoogleSearchView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data

        medicine_name = data.get("medicine_name")
        manufacturer = data.get("manufacturer")
        batch_number = data.get("batch_number")
        manufacturing_date = data.get("manufacturing_date")

        # ✅ Validation
        if not medicine_name:
            return Response({
                "success": False,
                "message": "Medicine name is required"
            }, status=400)

        # 🌐 Call Google Search Agent
        web_data = get_web_data(medicine_name)

        return Response({
            "success": True,
            "input": {
                "medicine_name": medicine_name,
                "manufacturer": manufacturer,
                "batch_number": batch_number,
                "manufacturing_date": manufacturing_date
            },
            "web_data": web_data
        })