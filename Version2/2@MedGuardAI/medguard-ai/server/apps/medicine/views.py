from rest_framework.decorators import api_view
from rest_framework.response import Response
from ai_agents.expiry_agent import get_expiry_from_web


@api_view(['POST'])
def verify_medicine_text(request):
    data = request.data

    medicine_name = data.get("medicine_name")
    manufacturing_date = data.get("manufacturing_date")
    manufacturer = data.get("manufacturer")
    batch_number = data.get("batch_number")

    if not medicine_name or not manufacturing_date:
        return Response({
            "status": "error",
            "message": "medicine_name and manufacturing_date required"
        }, status=400)

    expiry_result = get_expiry_from_web(
        medicine_name,
        manufacturing_date
    )

    return Response({
        "status": "success",
        "input_data": {
            "medicine_name": medicine_name,
            "manufacturer": manufacturer,
            "batch_number": batch_number,
            "manufacturing_date": manufacturing_date
        },
        "expiry_data": expiry_result
    })