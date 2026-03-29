from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q

from .models import Medicine, VerificationLog
from .serializers import MedicineSerializer
from .models import VerificationLog

# 🔍 1. SEARCH API
class MedicineSearchView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        query = request.GET.get('q')

        if not query:
            return Response({"error": "Query parameter 'q' required"}, status=400)

        medicines = Medicine.objects.filter(
            Q(name__icontains=query) |
            Q(brand__icontains=query) |
            Q(composition__icontains=query)
        )[:20]   # limit results

        for med in medicines:
            VerificationLog.objects.create(
            user=request.user,
            medicine=med,
            input_type="text",
            result="genuine"
        )

        return Response({
            "count": medicines.count(),
            "results": MedicineSerializer(medicines, many=True).data
        })


# 📄 2. MEDICINE DETAIL
class MedicineDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            medicine = Medicine.objects.get(id=pk)
            return Response(MedicineSerializer(medicine).data)
        except Medicine.DoesNotExist:
            return Response({"error": "Medicine not found"}, status=404)


# 🔎 3. BARCODE LOOKUP (if available later)
class MedicineBarcodeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, barcode):
        try:
            medicine = Medicine.objects.get(barcode=barcode)
            return Response(MedicineSerializer(medicine).data)
        except Medicine.DoesNotExist:
            return Response({"error": "Barcode not found"}, status=404)
        

class VerificationHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        logs = VerificationLog.objects.filter(
            user=request.user
        ).order_by('-created_at')[:20]

        data = []

        for log in logs:
            data.append({
                "medicine": log.medicine.name,
                "input_type": log.input_type,
                "result": log.result,
                "time": log.created_at
            })

        return Response(data)