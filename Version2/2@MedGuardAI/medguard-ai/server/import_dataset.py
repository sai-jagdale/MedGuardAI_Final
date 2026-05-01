# import os
# import django
# import pandas as pd

# # Setup Django
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'medguard.settings')
# django.setup()

# from apps.medicine.models import Medicine

# # Load CSV
# file_path = r"C:\MedGuardAI_Final\MedicineDatasets\MedGuard_Master_Dataset_Final1.csv"

# df = pd.read_csv(file_path)

# # Clean column names
# df.columns = df.columns.str.strip()

# # Batch insert
# batch_size = 5000
# objects = []

# for index, row in df.iterrows():
#     objects.append(Medicine(
#         name=row.get('Name'),
#         brand=row.get('Brand'),
#         manufacturer=row.get('Manufacturer'),
#         composition=row.get('Composition'),
#         uses=row.get('Uses'),
#         side_effects=row.get('Side_Effects'),
#         description=row.get('Description'),
#         legality=row.get('Legality_Status'),
#         created_at=row.get('Created_Timestamp')
#     ))

#     if len(objects) >= batch_size:
#         Medicine.objects.bulk_create(objects)
#         objects = []
#         print(f"Inserted {index} records...")

# # Insert remaining
# if objects:
#     Medicine.objects.bulk_create(objects)

# print("✅ Data import completed!")



import os
import django
import pandas as pd

# ✅ MUST be before any Django imports
os.environ['DJANGO_SETTINGS_MODULE'] = 'medguard.settings'
django.setup()

# ✅ Only import AFTER django.setup()
from apps.medicine.models import Medicine
# Load CSV
file_path = r"C:\Users\sudip\MedGuardAI_Final\MedGuard_Master_Dataset_Final (1).csv"

df = pd.read_csv(file_path)
df.columns = df.columns.str.strip()

batch_size = 5000
objects = []

for index, row in df.iterrows():
    objects.append(Medicine(
        # NO id field — let BigAutoField handle it
        name=row.get('Name') or '',
        brand=row.get('Brand'),
        manufacturer=row.get('Manufacturer'),
        composition=row.get('Composition'),
        uses=row.get('Uses'),
        side_effects=row.get('Side_Effects'),
        description=row.get('Description'),
        legality=row.get('Legality_Status') or 'Legal',
        created_at=pd.to_datetime(
            row.get('Created_Timestamp'), errors='coerce'),
    ))

    if len(objects) >= batch_size:
        Medicine.objects.bulk_create(objects, ignore_conflicts=True)
        objects = []
        print(f"Inserted up to record {index}...")

if objects:
    Medicine.objects.bulk_create(objects, ignore_conflicts=True)

print("✅ Data import completed!")
