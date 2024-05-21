from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import User, Token ,Video, Contact

# Register your models here.
admin.site.register(User)
admin.site.register(Token)
admin.site.register(Video)
admin.site.register(Contact)
