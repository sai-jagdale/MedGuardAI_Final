import base64
import requests
import os
import io
import re
from PIL import Image, ImageEnhance


# 🔥 STEP 1: IMAGE PREPROCESSING
def preprocess_image(image_file):
    """
    Improve image quality for OCR
    """
    img = Image.open(image_file)

    # 🔥 FIX: handle RGBA images
    if img.mode == "RGBA":
        img = img.convert("RGB")

    # Convert to grayscale
    img = img.convert("L")

    # Increase contrast
    contrast = ImageEnhance.Contrast(img)
    img = contrast.enhance(2.0)

    # Increase sharpness
    sharpness = ImageEnhance.Sharpness(img)
    img = sharpness.enhance(2.0)

    # Upscale image
    img = img.resize((img.width * 2, img.height * 2))

    buffer = io.BytesIO()
    img.save(buffer, format="JPEG")

    return buffer.getvalue()


# 🔥 STEP 2: MULTI-ROTATION OCR + MERGE RESULTS
def extract_text_with_rotations(image_file):
    """
    Run OCR on multiple rotations and combine all extracted text
    """
    api_key = os.environ.get("GOOGLE_CLOUD_VISION_API_KEY")

    url = f"https://vision.googleapis.com/v1/images:annotate?key={api_key}"

    img = Image.open(image_file)

    # 🔥 FIX: handle RGBA
    if img.mode == "RGBA":
        img = img.convert("RGB")

    collected_lines = set()

    for angle in [0, 90, 180, 270]:
        rotated = img.rotate(angle, expand=True)

        # 🔥 FIX: ensure RGB before saving
        if rotated.mode == "RGBA":
            rotated = rotated.convert("RGB")

        buffer = io.BytesIO()
        rotated.save(buffer, format="JPEG")

        image_bytes = buffer.getvalue()
        encoded_image = base64.b64encode(image_bytes).decode("utf-8")

        payload = {
            "requests": [
                {
                    "image": {"content": encoded_image},
                    "features": [
                        {"type": "DOCUMENT_TEXT_DETECTION"}
                    ]
                }
            ]
        }

        try:
            response = requests.post(url, json=payload)

            print(f"[OCR] Angle {angle} | Status:", response.status_code)
            print("FULL RESPONSE:", response.text)

            result = response.json()

            text = result["responses"][0]["fullTextAnnotation"]["text"]

            lines = text.split("\n")

            for line in lines:
                cleaned = line.strip()
                if cleaned:
                    collected_lines.add(cleaned)

        except Exception as e:
            print(f"[OCR ERROR] Angle {angle}:", e)
            continue

    final_text = "\n".join(collected_lines)

    return final_text if final_text else None


# 🔥 STEP 3: FIND DATES (EXTRACTION CHECK ONLY)
def find_nearby_dates(text):
    """
    Detect MFD / EXP patterns if present
    """
    pattern = r"(MFD|EXP)[^\d]*(\d{2}/\d{2,4})"
    matches = re.findall(pattern, text, re.IGNORECASE)
    return matches


# 🔥 MAIN FUNCTION
def extract_text_from_image(image_file):
    text = extract_text_with_rotations(image_file)

    if text:
        dates = find_nearby_dates(text)
        print("Detected Dates:", dates)

    return text