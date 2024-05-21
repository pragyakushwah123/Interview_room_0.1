from django.shortcuts import render
import os
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password
#login api import end

from django.shortcuts import render
from django.contrib.auth.hashers import make_password
from django.core.mail import send_mail
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User, Token
from .serializers import UserSerializer, TokenSerializer, ContactSerializer
from django.conf import settings
from datetime import datetime, timedelta
# import hashlib
# import uuid
from django.utils import timezone
from django.template.loader import render_to_string



SALT = "8b4f6b2cc1868d75ef79e5cfb8779c11b6a374bf0fce05b485581bf4e1e25b96c8c2855015de8449"
URL = "http://localhost:3000"

def mail_template(content, button_url, button_text):
    return f"""<!DOCTYPE html>
            <html>
            <body style="text-align: center; font-family: 'Verdana', serif; color: #000;">
                <div style="max-width: 600px; margin: 10px; background-color: #fafafa; padding: 25px; border-radius: 20px;">
                <p style="text-align: left;">{content}</p>
                <a href="{button_url}" target="_blank">
                    <button style="background-color: #444394; border: 0; width: 200px; height: 30px; border-radius: 6px; color: #fff;">{button_text}</button>
                </a>
                <p style="text-align: left;">
                    If you are unable to click the above button, copy paste the below URL into your address bar
                </p>
                <a href="{button_url}" target="_blank">
                    <p style="margin: 0px; text-align: left; font-size: 10px; text-decoration: none;">{button_url}</p>
                </a>
                </div>
            </body>
            </html>"""


            
#registration API
class RegistrationView(APIView):
    def post(self, request, format=None):
        request.data["password"] = make_password(
            password=request.data["password"], salt=SALT
        )
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"success": True, "message": "You are now registered on our website!"},
                status=status.HTTP_200_OK,
            )
        else:
            error_msg = ""
            for key in serializer.errors:
                error_msg += serializer.errors[key][0]
            return Response(
                {"success": False, "message": error_msg},
                status=status.HTTP_200_OK,
            )

#Login API
class LoginView(APIView):
    def post(self, request, format=None):
        email = request.data["email"]
        password = request.data["password"]
        hashed_password = make_password(password=password, salt=SALT)
        user = User.objects.get(email=email) 
        if user is None or user.password != hashed_password:
           
            return Response(
                {
                    "success": False,
                    "message": "Invalid Login Credentials!",
                    
                },
                status=status.HTTP_200_OK,
            )
        else:
            name = user.name
            phone = user.phone
           
            return Response(
                {
                    "success": True, 
                    "message": "You are now logged in!",
                    "name": name,
                    "phone":phone,
                },
                status=status.HTTP_200_OK,)

#video API
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Video
from .serializers import VideoSerializer

class UploadVideoView(APIView):
    def post(self, request, *args, **kwargs):
        video_file = request.FILES.get('video')
        email = request.POST.get('email')
        if video_file:
            # Save the video file to the database
            video = Video.objects.create(video_file=video_file, email=email)
            serializer = VideoSerializer(video)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': 'No video file provided'}, status=status.HTTP_400_BAD_REQUEST)
      
        

# interviews/views.py
# import openai

# apikey = ""

# openai.api_key = apikey

#StartInterviewAPI
import os
import signal
import subprocess
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
assistant_pid = None

class StartInterviewView(APIView):
    @csrf_exempt
    def post(self, request, format=None):
        global assistant_pid
        assistant_process = subprocess.Popen(['python', 'api/assitent.py'])
        assistant_pid = assistant_process.pid
        
        return Response({"message": "Assistant started"}, status=200)

import os
import signal
from rest_framework.views import APIView
from rest_framework.response import Response

assistant_pid = None

class StopAssistantView(APIView):
    def post(self, request, format=None):
        global assistant_pid
        
        if assistant_pid is not None:
            try:
                # Terminate the assistant process using its PID
                os.kill(assistant_pid, signal.SIGTERM)
                assistant_pid = None
                return Response({"message": "Assistant stopped"}, status=200)
            except OSError as e:
                if e.winerror == 87:  # Check if the error is due to an incorrect parameter
                    return Response({"message": "Error stopping assistant: Incorrect parameter"}, status=400)
                else:
                    raise  # Re-raise the exception if it's not related to an incorrect parameter
        else:
            return Response({"message": "No assistant process running"}, status=400)


#Contact_us API
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from .serializers import ContactSerializer

# class ContactCreateView(APIView):
#     def post(self, request, format=None):
#         serializer = ContactSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response( serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ContactCreateView(APIView):
    def post(self, request, format=None):
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            contact_instance = serializer.save()

            # Send email to admin with all contact details
            self.send_admin_email(contact_instance)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def send_admin_email(self, contact_instance):
        admin_email = settings.ADMIN_EMAIL  # Replace with your admin email
        subject = "Contact Form Response"
        
        # Create email content with all contact details
        content = f"""
            New contact form submission:
            Name: {contact_instance.name}
            Email: {contact_instance.email}
            Message: {contact_instance.message}
        """

        # Send the email
        send_mail(subject, content, settings.EMAIL_HOST_USER, [admin_email])


from django.core.mail import send_mail
from django.http import JsonResponse, HttpResponseRedirect
from django.shortcuts import redirect
from django.urls import reverse
from django.utils.crypto import get_random_string
from django.views import View
from .models import User

class SendVerificationEmail(View):
    def post(self, request):
        email = request.POST.get('email')
        if email:
            token = get_random_string(length=32)
            User.objects.create(email=email, token=token)
            verification_link = request.build_absolute_uri(reverse('verify_email')) + f'?token={token}'
            send_mail(
                'Verify Your Email',
                f'Click the following link to verify your email: {verification_link}',
                'from@example.com',
                [email],
                fail_silently=False,
            )
            return JsonResponse({'message': 'Verification email sent.'})
        return JsonResponse({'error': 'Email not provided.'})

class VerifyEmail(View):
    def get(self, request):
        token = request.GET.get('token')
        if token:
            user_email = User.objects.filter(token=token).first()
            if user_email:
                user_email.verified = True
                user_email.save()
                return redirect('verified_email_page')  # Redirect to a page indicating successful verification
        return redirect('unverified_email_page')  # Redirect to a page indicating failed verification

