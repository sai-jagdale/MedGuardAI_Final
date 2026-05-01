from django.db import models
from django.conf import settings
from pgvector.django import VectorField


class Medicine(models.Model):
    id = models.BigAutoField(primary_key=True)

    name = models.CharField(max_length=255)
    brand = models.CharField(max_length=255, null=True, blank=True)
    manufacturer = models.CharField(max_length=255, null=True, blank=True)

    composition = models.TextField(null=True, blank=True)
    uses = models.TextField(null=True, blank=True)
    side_effects = models.TextField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)

    legality = models.CharField(max_length=50)

    created_at = models.DateTimeField(null=True, blank=True)

    embedding = VectorField(dimensions=768, null=True,
                            blank=True)  # Added this for embeddings

    def __str__(self):
        return self.name


class VerificationLog(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    medicine = models.ForeignKey(Medicine, on_delete=models.CASCADE)

    input_type = models.CharField(max_length=50)  # text / barcode / image
    result = models.CharField(max_length=50)      # genuine / suspicious

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} - {self.medicine.name}"
