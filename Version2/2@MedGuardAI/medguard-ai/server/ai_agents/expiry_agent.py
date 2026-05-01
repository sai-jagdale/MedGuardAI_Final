# ai_agents/expiry_agent.py

from datetime import datetime, timedelta
from .web_agent import search_medicine_shelf_life, extract_shelf_life_years


DEFAULT_SHELF_LIFE = 1.5


def get_expiry_from_web(medicine_name, manufacturing_date):
    try:
        # 🔹 Step 1: Search
        snippets = search_medicine_shelf_life(medicine_name)

        # 🔹 Step 2: Extract shelf life
        shelf_life = extract_shelf_life_years(snippets)

        if not shelf_life:
            shelf_life = DEFAULT_SHELF_LIFE
            source = "default"
        else:
            source = "web"

        # 🔹 Step 3: Calculate expiry
        mfg_date = datetime.strptime(manufacturing_date, "%d-%m-%Y")

        expiry_date = mfg_date + timedelta(days=int(365 * shelf_life))

        return {
            "medicine_name": medicine_name,
            "shelf_life_years": shelf_life,
            "expiry_date": expiry_date.strftime("%d-%m-%Y"),
            "source": source
        }

    except Exception as e:
        print("Expiry Agent Error:", e)
        return {
            "medicine_name": medicine_name,
            "shelf_life_years": DEFAULT_SHELF_LIFE,
            "expiry_date": None,
            "source": "error"
        }