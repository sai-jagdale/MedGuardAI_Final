from .gemini_service import generate_ai_response
from .symptom_prompt import build_symptom_prompt

def get_symptom_response(api_key, message, history):
    prompt = build_symptom_prompt(message, history)
    return generate_ai_response(api_key, prompt)