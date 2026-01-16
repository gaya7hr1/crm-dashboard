from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    LeadViewSet, 
    register, 
    request_password_reset,
    confirm_password_reset
)

router = DefaultRouter()
router.register(r'leads', LeadViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', register, name='register'),
    path('password-reset/', request_password_reset, name='password_reset'),
    path('password-reset-confirm/', confirm_password_reset, name='password_reset_confirm'),
]