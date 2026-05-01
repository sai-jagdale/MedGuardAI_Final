from google import genai
import json
import os


def normalize_with_llm(api_key, raw_text):
    api_key = os.environ.get("GEMINI_API_KEY_FOR_EXTRACTION")

    client = genai.Client(api_key=api_key)

    prompt = f"""
You are a medical data extraction system.

Extract structured information from the OCR text of a medicine package.

Return ONLY valid JSON in this exact format:

{{
  "medicine_name": "",
  "composition": "",
  "manufacturer": "",
  "manufacturing_date": "",
  "expiry_date": "",
  "mrp": "",
  "pack_size": "",
  "barcode": "",
  "dosage": "",
  "warnings": ""
}}

Rules:
- Do NOT hallucinate
- If value not found → keep ""
- Extract only from given text
- No explanation, only JSON

OCR TEXT:
{raw_text}
"""

    response = client.models.generate_content(
        model="models/gemini-3-flash-preview",
        contents=prompt
    )

    text = response.text.strip()

    # Clean markdown if present
    if text.startswith("```"):
        text = text.replace("```json", "").replace("```", "").strip()

    try:
        return json.loads(text)
    except:
        return {
            "error": "Invalid JSON from LLM",
            "raw_output": text
        }