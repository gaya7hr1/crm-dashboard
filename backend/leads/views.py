from django.shortcuts import render
from rest_framework import viewsets, status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Lead, PasswordResetToken
from .serializers import (
    LeadSerializer,
    UserRegistrationSerializer,
    PasswordResetSerializer,
    PasswordResetConfirmSerializer
)


class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
    permission_classes = [IsAuthenticated]


@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def request_password_reset(request):
    serializer = PasswordResetSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        user = User.objects.get(email=email)
        reset_token = PasswordResetToken.objects.create(user=user)

        return Response({
            'message': 'Password reset email sent',
            'token': str(reset_token.token)
        }, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def confirm_password_reset(request):
    serializer = PasswordResetConfirmSerializer(data=request.data)
    if serializer.is_valid():
        token = serializer.validated_data['token']
        new_password = serializer.validated_data['new_password']

        try:
            reset_token = PasswordResetToken.objects.get(token=token, is_used=False)
            user = reset_token.user
            user.set_password(new_password)
            user.save()
            reset_token.is_used = True
            reset_token.save()
            return Response({'message': 'Password reset successfully'}, status=status.HTTP_200_OK)
        except PasswordResetToken.DoesNotExist:
            return Response({'error': 'Invalid or expired token'}, status=status.HTTP_400_BAD_REQUEST)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
