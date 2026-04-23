import os
import json
import re

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from apps.history.models import ChatSession, ChatMessage
from .symptom_service import get_symptom_response


class SymptomAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        message = request.data.get("message")
        session_id = request.data.get("session_id")

        # ✅ Create or get session
        if session_id:
            session = ChatSession.objects.get(id=session_id, user=user)
        else:
            session = ChatSession.objects.create(user=user)

        # ✅ Save user message
        ChatMessage.objects.create(
            session=session,
            role="user",
            content=message
        )

        # ✅ Fetch history
        messages = ChatMessage.objects.filter(session=session).order_by("timestamp")

        history = [
            {"role": m.role, "message": m.content}
            for m in messages
        ]

        # ✅ AI response
        reply = get_symptom_response(os.environ.get("GEMINI_API_KEY"), message, history)

        # ✅ Save AI response
        ChatMessage.objects.create(
            session=session,
            role="assistant",
            content=reply
        )

        return Response({
            "session_id": session.id,
            "data": reply
        })