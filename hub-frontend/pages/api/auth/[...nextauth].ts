import NextAuth, { NextAuthOptions, Account, User, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

// Define your backend API URL (ensure this is set in your environment)
const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'https://synchub-cloudrun-834454980092.us-central1.run.app/api';

// Define an interface for the user object we'll use internally
interface CustomUser extends User {
  id: string;
  role?: string;
  backendToken?: string; // To temporarily hold the token during signin
}


export const authOptions: NextAuthOptions = {
  providers: [
    {
      // --- Custom Provider Configuration ---
      // This interacts with YOUR Django backend which then talks to Google
      id: "synchub-backend-google", // Unique ID for this provider
      name: "SyncHubGoogle",
      type: "oauth",
      version: "2.0", // Assuming OAuth 2.0

      // Point this to the URL that *initiates* the Google login flow on your Django backend
      authorization: {
        url: `${BACKEND_API_URL}/auth/google/login/`,
        params: { scope: "profile email" }, // Must match scopes allowed by Google Cloud Console & Django settings
      },

      // --- Token Exchange & User Info ---
      // next-auth expects standard OAuth endpoints here. dj-rest-auth's social login might not
      // perfectly map. We might need to handle the token capture differently, possibly
      // in the callback handler or by overriding parts of the flow.
      // For now, we assume the backend redirects back with necessary info,
      // and the 'account' object in the jwt callback might contain the token.

      // Placeholder - dj-rest-auth might not have a separate token endpoint for social
      // token: `${BACKEND_API_URL}/auth/google/token-exchange/`, // This URL likely doesn't exist by default

      // Endpoint on your Django backend to get user details using the token
      userinfo: {
          url: `${BACKEND_API_URL}/auth/user/`,
          // The request function might need customization if the backend expects
          // the token differently than standard Bearer
          async request(context) {
              // context contains tokens.access_token received from the provider/backend
              // We need the token obtained *after* the backend login flow
              const token = context.tokens.access_token; // Adjust if token is named differently
              const url = typeof context.provider.userinfo === 'string'
                ? context.provider.userinfo
                : context.provider.userinfo?.url;
              if (!url) {
                throw new Error('Userinfo URL is undefined');
              }
              const response = await fetch(url, {
                  headers: {
                      // Use 'Token' prefix as dj-rest-auth uses DRF TokenAuthentication by default
                      'Authorization': `Token ${token}`,
                      'Content-Type': 'application/json',
                  },
              });
              if (!response.ok) {
                  throw new Error("Failed to fetch user info from backend");
              }
              return await response.json();
          }
      },

      // Map the response from your backend's userinfo endpoint to the next-auth user object
      profile(profile: Record<string, unknown>): CustomUser {
          const p = profile as {
            pk: number | string;
            username?: string;
            first_name?: string;
            last_name?: string;
            email?: string;
            role?: string;
          };
          return {
              id: p.pk.toString(),
              name: p.username || `${p.first_name ?? ""} ${p.last_name ?? ""}`.trim(),
              email: p.email,
              role: p.role,
          };
      },

      // --- Client ID/Secret ---
      // These might *not* be needed directly by next-auth if the backend handles
      // the Google interaction entirely. However, they are required by the provider config.
      // Ensure they are available as environment variables.
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  ],
  session: {
    strategy: "jwt", // Use JSON Web Tokens for session management
  },
  callbacks: {
    // This callback is crucial for capturing the token returned by your backend
    async jwt({ token, user, account }: { token: JWT; user?: CustomUser | User; account?: Account | null }): Promise<JWT> {
      // console.log("JWT Callback:", { token, user, account }); // Debugging

      // 'account' contains info from the OAuth provider (our backend wrapper) after successful sign-in
      // 'user' is the profile object returned from the profile() callback
      if (account && user) {
        // --- IMPORTANT ---
        // We need to extract the actual Django REST Framework token here.
        // How dj-rest-auth/allauth provides this back to the redirect URL needs investigation.
        // Common methods:
        // 1. In the 'access_token' field of the 'account' object (if backend mimics standard OAuth).
        // 2. In a custom field within the 'account' object.
        // 3. As a query parameter in the redirect URL (would need custom handling).
        // 4. Set in a cookie (would need custom handling).

        // Assuming scenario 1 for now: dj-rest-auth returns DRF token as 'access_token' to next-auth
        token.accessToken = account.access_token; // ** This is the critical assumption **
        token.userId = user.id;
        token.role = (user as CustomUser).role; // Add role if available
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },

    // This callback makes the token and user info available to the client-side session
    async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
      // console.log("Session Callback:", { session, token }); // Debugging
      (session as Session & { accessToken?: string }).accessToken = token.accessToken as string | undefined;
      (session.user as CustomUser).id = typeof token.userId === 'string' ? token.userId : '';
      (session.user as CustomUser).role = token.role as string | undefined;
      // Keep default user fields (name, email, image) managed by next-auth if needed
      // session.user.name = token.name;
      // session.user.email = token.email;
      return session;
    },
  },

  // A secret is needed for signing JWTs
  secret: process.env.NEXTAUTH_SECRET,

  // Enable debug messages in development
  debug: process.env.NODE_ENV === 'development',

  // Optional: Define custom pages if needed
  // pages: {
  //   signIn: '/auth/signin', // Custom sign-in page
  //   error: '/auth/error', // Custom error page
  // }
};

export default NextAuth(authOptions);

// Note: The interaction between next-auth and a custom backend OAuth flow (especially one
// like dj-rest-auth handling social auth) can be complex. The key is correctly capturing
// the *final* authentication token issued by your Django backend after the Google login
// completes. This configuration assumes the token is passed back in a way next-auth's
// standard OAuth flow can capture it in the `account.access_token` field during the jwt callback.
// If this doesn't work, debugging the `account` object in the jwt callback is essential,
// or potentially switching to a CredentialsProvider strategy after the backend redirect. 