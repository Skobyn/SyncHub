from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .viewsets import RetailerViewSet, AgentViewSet, DestinationViewSet, JobViewSet

router = DefaultRouter()
router.register(r'retailers', RetailerViewSet)
router.register(r'agents', AgentViewSet)
router.register(r'destinations', DestinationViewSet)
router.register(r'jobs', JobViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 