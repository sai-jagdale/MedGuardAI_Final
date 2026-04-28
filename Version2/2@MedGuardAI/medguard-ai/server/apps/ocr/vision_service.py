import requests
import base64
import os


def extract_text_from_image(image_file):
    api_key = os.environ.get("GOOGLE_CLOUD_VISION_API_KEY")

    url = f"https://vision.googleapis.com/v1/images:annotate?key={api_key}"

    # Convert image to base64
    image_bytes = image_file.read()
    encoded_image = base64.b64encode(image_bytes).decode("utf-8")

    payload = {
        "requests": [
            {
                "image": {
                    "content": encoded_image
                },
                "features": [
                    {"type": "TEXT_DETECTION"}
                ]
            }
        ]
    }

    response = requests.post(url, json=payload)
    result = response.json()

    try:
        text = result["responses"][0]["fullTextAnnotation"]["text"]
        return text
    except:
        return None