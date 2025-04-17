from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.serializers import UserDetailsSerializer
from rest_framework.response import Response


class GoogleLogin(SocialLoginView):
    """Endpoint for Google OAuth2 login using dj-rest-auth with token exchange.

    Expects JSON payload: {"access_token": "<google-access-token>"}
    Returns: {"key": "<auth-token>", "user": { ...user fields... }}
    """

    adapter_class = GoogleOAuth2Adapter

    def get_response(self):
        """Extend the default response to include serialized user details."""
        original_response: Response = super().get_response()
        # Ensure the user is attached by the parent class (LoginView)
        if hasattr(self, "user") and self.user is not None:
            original_response.data["user"] = UserDetailsSerializer(
                self.user, context=self.get_serializer_context()
            ).data
        return original_response 