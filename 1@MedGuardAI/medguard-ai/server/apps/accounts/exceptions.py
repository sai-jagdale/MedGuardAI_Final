from django.utils import timezone
from rest_framework.views import exception_handler
from rest_framework.response import Response

_STATUS_CODE_MAP = {
    400: 'VALIDATION_ERROR',
    401: 'UNAUTHORIZED',
    403: 'FORBIDDEN',
    404: 'NOT_FOUND',
    500: 'INTERNAL_SERVER_ERROR',
    503: 'SERVICE_UNAVAILABLE',
}

def medguard_exception_handler(exc, context):
    response = exception_handler(exc, context)
    if response is not None:
        data = response.data
        if isinstance(data, dict):
            first_key = next(iter(data), None)
            raw = data.get(first_key, str(data))
            message = raw[0] if isinstance(raw, list) else str(raw)
        elif isinstance(data, list):
            message = data[0] if data else 'An error occurred.'
        else:
            message = str(data)

        response.data = {
            'status':     'error',
            'message':    message,
            'error_code': _STATUS_CODE_MAP.get(response.status_code, 'ERROR'),
            'timestamp':  timezone.now().isoformat(),
        }
    return response


def success_response(data=None, message='Success', status_code=200):
    from rest_framework import status as drf_status
    payload = {
        'status':    'success',
        'message':   message,
        'timestamp': timezone.now().isoformat(),
    }
    if data is not None:
        payload['data'] = data
    return Response(payload, status=status_code)