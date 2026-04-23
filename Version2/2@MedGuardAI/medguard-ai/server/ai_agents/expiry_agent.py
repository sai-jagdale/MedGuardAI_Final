from datetime import datetime
from dateutil.relativedelta import relativedelta

def calculate_expiry(mfg_date, shelf_life_months):
    mfg = datetime.strptime(mfg_date, "%Y-%m-%d")
    expiry = mfg + relativedelta(months=shelf_life_months)

    return expiry.strftime("%Y-%m-%d")