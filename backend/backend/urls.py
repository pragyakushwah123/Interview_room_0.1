#backend/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from backend import settings
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),

]
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
