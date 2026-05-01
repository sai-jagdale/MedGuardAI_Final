from django.db import models

class MedicineBarcode(models.Model):
    medicine_name = models.CharField(max_length=255)
    barcode_number = models.CharField(max_length=50)

    class Meta:
        db_table = "medicine_barcodes"   # 🔥 IMPORTANT

    def __str__(self):
        return self.medicine_name