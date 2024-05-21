import os
import signal
from django.utils.deprecation import MiddlewareMixin

assistant_pid = None

class AbortDetectionMiddleware(MiddlewareMixin):
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        global assistant_pid

        response = self.get_response(request)

        # Check if the request was aborted
        if hasattr(request, 'aborted') and request.aborted:
            # Log or perform any cleanup action
            print('Request was aborted:', request.path)

            # Terminate the assistant process if running
            if assistant_pid is not None:
                os.kill(assistant_pid, signal.SIGTERM)
                assistant_pid = None

        return response
