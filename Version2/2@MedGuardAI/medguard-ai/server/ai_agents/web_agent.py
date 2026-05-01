# ai_agents/web_agent.py

import os
import requests
import re
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GOOGLE_API_KEY")
CX = os.getenv("SEARCH_ENGINE_ID")


def search_medicine_shelf_life(medicine_name):
    try:
        query = f"{medicine_name} medicine shelf life expiry period years"

        url = "https://www.googleapis.com/customsearch/v1"

        params = {
            "key": API_KEY,
            "cx": CX,
            "q": query,
        }

        response = requests.get(url, params=params)
        data = response.json()

        results = []

        if "items" in data:
            for item in data["items"]:
                snippet = item.get("snippet", "")
                results.append(snippet)

        return results

    except Exception as e:
        print("Web Search Error:", e)
        return []


def extract_shelf_life_years(snippets):
    for text in snippets:
        text = text.lower()

        year_match = re.search(r'(\d+(\.\d+)?)\s*(year|years)', text)
        month_match = re.search(r'(\d+)\s*(month|months)', text)

        if year_match:
            return float(year_match.group(1))

        if month_match:
            months = int(month_match.group(1))
            return months / 12

    return None