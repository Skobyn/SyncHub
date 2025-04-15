from django.db import models
from django.contrib.auth.models import AbstractUser

class Retailer(models.Model):
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class User(AbstractUser):
    ADMIN = 'admin'
    TECHNICIAN = 'technician'
    ROLE_CHOICES = [
        (ADMIN, 'Admin'),
        (TECHNICIAN, 'Technician'),
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default=TECHNICIAN)
    retailer = models.ForeignKey(Retailer, on_delete=models.CASCADE, null=True, blank=True, related_name='users')
    # Admins may not be tied to a retailer (global admin)

class Agent(models.Model):
    retailer = models.ForeignKey(Retailer, on_delete=models.CASCADE, related_name='agents')
    name = models.CharField(max_length=255)
    api_key = models.CharField(max_length=128, unique=True)
    is_active = models.BooleanField(default=True)
    last_check_in = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.retailer.name})"

class Destination(models.Model):
    retailer = models.ForeignKey(Retailer, on_delete=models.CASCADE, related_name='destinations')
    name = models.CharField(max_length=255)
    DEST_TYPE_CHOICES = [
        ('sftp', 'SFTP'),
        ('shopify', 'Shopify'),
        ('woocommerce', 'WooCommerce'),
        # Add more as needed
    ]
    dest_type = models.CharField(max_length=50, choices=DEST_TYPE_CHOICES)
    config = models.JSONField(help_text='Destination-specific configuration (e.g., credentials, endpoint)')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.get_dest_type_display()})"

class Job(models.Model):
    retailer = models.ForeignKey(Retailer, on_delete=models.CASCADE, related_name='jobs')
    agent = models.ForeignKey(Agent, on_delete=models.CASCADE, related_name='jobs')
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE, related_name='jobs')
    name = models.CharField(max_length=255)
    pos_plugin = models.CharField(max_length=255, help_text='POS plugin identifier')
    dest_plugin = models.CharField(max_length=255, help_text='Destination plugin identifier')
    schedule = models.CharField(max_length=255, blank=True, help_text='Cron or schedule expression')
    is_active = models.BooleanField(default=True)
    last_run_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.retailer.name})"
