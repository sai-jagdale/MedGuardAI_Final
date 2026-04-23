from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import ChatSession, ChatMessage


# ✅ Get all sessions
class ChatSessionListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        sessions = ChatSession.objects.filter(user=request.user).order_by("-created_at")

        data = [
            {
                "session_id": s.id,
                "created_at": s.created_at
            }
            for s in sessions
        ]

        return Response(data)


# ✅ Get messages in session
class ChatMessagesAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, session_id):
        messages = ChatMessage.objects.filter(session_id=session_id, session__user=request.user)

        data = [
            {
                "role": m.role,
                "content": m.content,
                "timestamp": m.timestamp
            }
            for m in messages
        ]

        return Response(data)
 
    
class ChatSessionListAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        sessions = ChatSession.objects.filter(user=request.user).order_by("-created_at")

        data = []

        for s in sessions:
            first_msg = ChatMessage.objects.filter(session=s, role="user").first()

            preview = ""
            if first_msg:
                words = first_msg.content.split()[:5]
                preview = " ".join(words) + "..."

            data.append({
                "id": s.id,
                "type": "chat",
                "preview": preview,
                "date": s.created_at.strftime("%d %b %Y"),
            })

        return Response(data)