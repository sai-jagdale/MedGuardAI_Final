import os
import django
from dotenv import load_dotenv

load_dotenv()
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'medguard.settings')
django.setup()

import ollama
from apps.medicine.models import Medicine

EMBED_MODEL = "nomic-embed-text"
BATCH_SIZE  = 100

def build_text(med) -> str:
    return " | ".join(filter(None, [
        f"name: {med.name}",
        f"composition: {med.composition}" if med.composition else "",
        f"uses: {med.uses}" if med.uses else "",
        f"side_effects: {med.side_effects}" if med.side_effects else "",
    ]))

qs = Medicine.objects.filter(embedding__isnull=True)
total = qs.count()
print(f"Embedding {total} medicines with Ollama ({EMBED_MODEL})...")

batch = []
for i, med in enumerate(qs.iterator(), 1):
    resp = ollama.embeddings(model=EMBED_MODEL, prompt=build_text(med))
    med.embedding = resp["embedding"]
    batch.append(med)

    if len(batch) >= BATCH_SIZE:
        Medicine.objects.bulk_update(batch, ["embedding"])
        batch = []
        print(f"  ✅ {i}/{total} done")

if batch:
    Medicine.objects.bulk_update(batch, ["embedding"])

print("🎉 All embeddings generated!")