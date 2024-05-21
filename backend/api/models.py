from django.db import models

# Create your models here.
# api/models.py
from django.db import models

# Create your models here.


class Token(models.Model):
    id = models.AutoField(primary_key=True)
    token = models.CharField(max_length=255)
    created_at = models.DateTimeField()
    expires_at = models.DateTimeField()
    user_id = models.IntegerField()
    is_used = models.BooleanField(default=False)


class User(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    phone = models.CharField(max_length=20, null=True)
    
    
    def __str__(self) -> str:
        return self.name

class Video(models.Model):
    email = models.EmailField()
    video_file = models.FileField(upload_to='videos/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    
    def __str__(self):
        return f"Video - {self.uploaded_at}"
    
class Contact(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    message = models.TextField(max_length=500)
        
    def __str__(self) -> str:
        return self.name
