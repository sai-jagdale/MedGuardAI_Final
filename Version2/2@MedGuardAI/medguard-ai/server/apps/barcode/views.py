from rest_framework.decorators import api_view
from rest_framework.response import Response
from .service import process_uploaded_file, process_base64_image, find_medicine


@api_view(['POST'])
def scan_from_image(request):
    file = request.FILES.get('image')

    if not file:
        return Response({"error": "No image provided"}, status=400)

    barcodes = process_uploaded_file(file)

    response = []
    for b in barcodes:
        medicine = find_medicine(b['data'])

        response.append({
            "barcode": b['data'],
            "type": b['type'],
            "medicine": medicine
        })

    return Response(response)


@api_view(['POST'])
def scan_from_mobile(request):
    base64_image = request.data.get('image')

    if not base64_image:
        return Response({"error": "No image provided"}, status=400)

    barcodes = process_base64_image(base64_image)

    response = []
    for b in barcodes:
        medicine = find_medicine(b['data'])

        response.append({
            "barcode": b['data'],
            "type": b['type'],
            "medicine": medicine
        })

    return Response(response)


@api_view(['POST'])
def scan_from_code(request):
    barcode = request.data.get('barcode')

    if not barcode:
        return Response({"error": "No barcode provided"}, status=400)

    # normalize before search
    from .service import normalize_barcode
    barcode = normalize_barcode(barcode)

    medicine = find_medicine(barcode)

    return Response({
        "barcode": barcode,
        "medicine": medicine or "Not Found"
    })