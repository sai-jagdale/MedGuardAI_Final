import requests
import os
import re

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
SEARCH_ENGINE_ID = os.getenv("SEARCH_ENGINE_ID")


def search_google(query):
    url = "https://www.googleapis.com/customsearch/v1"

    params = {
        "key": settings.GOOGLE_API_KEY,
        "cx": settings.SEARCH_ENGINE_ID,
        "q": query,
    }

    response = requests.get(url, params=params)

    data = response.json()

    print("QUERY:", query)
    print("RESPONSE:", data)   # 🔥 ADD THIS

    return data


def extract_info(results):
    snippets = []

    for item in results.get("items", []):
        snippets.append(item.get("snippet", ""))

    text = " ".join(snippets)

    return text

def extract_shelf_life(text):
    text = text.lower()

    # Find years (e.g. 2 years, 2-3 years)
    year_matches = re.findall(r'(\d+)\s*[-to]*\s*(\d+)?\s*years?', text)

    if year_matches:
        values = []
        for match in year_matches:
            nums = [int(x) for x in match if x]
            values.extend(nums)

        min_years = min(values)
        return min_years * 12  # convert to months

    # Find months (e.g. 24 months)
    month_matches = re.findall(r'(\d+)\s*months?', text)

    if month_matches:
        values = [int(x) for x in month_matches]
        return min(values)

    return None

def get_web_data(medicine_name):
    shelf_results = search_google(f"{medicine_name} shelf life")
    price_results = search_google(f"{medicine_name} price India")

    shelf_text = extract_info(shelf_results)
    price_text = extract_info(price_results)

    shelf_life_months = extract_shelf_life(shelf_text)

    return {
        "shelf_life_raw": shelf_text,
        "shelf_life_months": shelf_life_months,  # ✅ CLEAN VALUE
        "price_raw": price_text
    }