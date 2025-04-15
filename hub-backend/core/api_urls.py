from rest_framework.routers import DefaultRouter
from django.urls import path, include

router = DefaultRouter()
# Example: router.register(r'retailers', RetailerViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 