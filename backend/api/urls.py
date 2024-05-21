# api/urls.py

from django.urls import path
from .views import RegistrationView, LoginView, UploadVideoView, ContactCreateView ,StartInterviewView, StopAssistantView
# , ResetPasswordView,StartInterviewView

urlpatterns = [
    path("register", RegistrationView.as_view(), name="register"),
    path("login", LoginView.as_view(), name="login"),
    path("video", UploadVideoView.as_view(), name="video"),
    path("start-interview/", StartInterviewView.as_view(), name="start-interview/"),
    path("stop-assistant/", StopAssistantView.as_view(), name="stop-assistant/"),
    path("contact_us/", ContactCreateView.as_view(), name="contact_us/"),
    #path("forgotPassword", ForgotPasswordView.as_view(), name="forgotPassword"),
    # path("resetPassword", ResetPasswordView.as_view(), name="resetPassword"),
]
