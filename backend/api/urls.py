from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('test/', views.testEndPoint, name='test'),
    path('username/<int:user_id>', views.getUsername, name='getUsername'),
    path('update-profile/', views.updateProfile, name='updateProfile'),
    path('create-perfil/', views.create_perfil, name='create_perfil'),
    path('users/', views.users, name='users'),
    path('', views.getRoutes)
]
