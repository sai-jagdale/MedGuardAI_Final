from google import genai

def generate_ai_response(api_key, prompt):
    client = genai.Client(api_key=api_key)

    response = client.models.generate_content(
        model="models/gemini-3-flash-preview",
        contents=prompt
    )

    return response.text