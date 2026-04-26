from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
import requests
import os

class BarcodeScanAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        barcode = request.data.get("barcode")   # from ML Kit
        image = request.FILES.get("image")      # from upload

        # STEP 1: Get barcode value
        if not barcode and image:
            barcode = self.extract_barcode_from_image(image)

        if not barcode:
            return Response({"error": "No barcode found"}, status=400)

        # STEP 2: Get medicine name
        medicine_name = self.search_medicine_name(barcode)

        if not medicine_name:
            return Response({
                "barcode": barcode,
                "message": "Could not identify medicine"
            })

        # STEP 3: RAG + Decision + LLM (placeholder now)
        return Response({
            "barcode": barcode,
            "medicine_name": medicine_name,
            "status": "processing_next_stage"
        })
    
    def extract_barcode_from_image(self, image):
        # ⚠️ ML Kit works on frontend/mobile
        # Backend fallback → use pyzbar OR skip

        try:
            from pyzbar.pyzbar import decode
            from PIL import Image

            img = Image.open(image)
            decoded = decode(img)

            if decoded:
                return decoded[0].data.decode("utf-8")

        except Exception as e:
            print("Barcode decode error:", e)

        return None

    def search_medicine_name(self, barcode):
        api_key = os.environ.get("GOOGLE_API_KEY")
        cx = os.environ.get("SEARCH_ENGINE_ID")   # ✅ updated

        query = f"{barcode} medicine name India 1mg netmeds pharmeasy"

        url = "https://www.googleapis.com/customsearch/v1"

        params = {
            "q": query,
            "key": api_key,
            "cx": cx,
        }

        try:
            response = requests.get(url, params=params)

            print("STATUS:", response.status_code)
            print("RAW:", response.text)   # 🔥 VERY IMPORTANT

            data = response.json()

            if "items" in data:
                for item in data["items"]:
                    title = item.get("title", "")
                    print("TITLE:", title)

                    # Try extracting clean name
                    if "|" in title:
                        return title.split("|")[0].strip()
                    return title
            if "items" not in data:
                query = f"{barcode} drug name"
                params["q"] = query
                response = requests.get(url, params=params)
                data = response.json()

        except Exception as e:
            print("Search error:", e)

        return None