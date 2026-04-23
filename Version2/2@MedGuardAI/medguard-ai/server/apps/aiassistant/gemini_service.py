import google.generativeai as genai

def generate_ai_response(api_key, prompt):
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-2.5-flash')

    response = model.generate_content(prompt)
    return response.text