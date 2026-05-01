from .models import MedicineBarcode
from pyzbar.pyzbar import decode
from PIL import Image
import base64
from io import BytesIO
import re


def normalize_barcode(value):
    if not value:
        return ""

    value = str(value).strip()

    # Remove everything except digits
    value = re.sub(r'\D', '', value)

    # Remove leading zeros
    value = value.lstrip('0')

    return value


def find_medicine(barcode_value):
    barcode_value = normalize_barcode(barcode_value)

    all_records = MedicineBarcode.objects.all()

    for record in all_records:
        db_barcode = normalize_barcode(record.barcode_number)

        # Exact match
        if db_barcode == barcode_value:
            return record.medicine_name

        # Partial match (handles GS1, prefixes)
        if barcode_value in db_barcode or db_barcode in barcode_value:
            return record.medicine_name

    return None


def decode_barcode(image):
    barcodes = decode(image)
    results = []

    for barcode in barcodes:
        raw_data = barcode.data.decode('utf-8')
        clean_data = normalize_barcode(raw_data)

        results.append({
            "data": clean_data,
            "type": barcode.type
        })

    return results


def process_uploaded_file(file):
    image = Image.open(file)
    return decode_barcode(image)


def process_base64_image(base64_string):
    try:
        # Remove base64 prefix if present
        if "," in base64_string:
            base64_string = base64_string.split(",")[1]

        image_data = base64.b64decode(base64_string)
        image = Image.open(BytesIO(image_data))

        return decode_barcode(image)

    except Exception as e:
        return []
    