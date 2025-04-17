import NextAuth, { NextAuthOptions, Account, User, Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';

// Backend base URL (ensure set in env variables)
const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL ?? '';

// Define an interface for the user object we'll use internally
interface CustomUser extends User {
  id: string;
  role?: string;
  backendToken?: string; // To temporarily hold the token during signin
}


export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: { params: { scope: "openid profile email" } },
    }),
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
      if (account && account.provider === 'google') {
        // Exchange Google access_token for backend DRF token
        try {
          const resp = await fetch(`${BACKEND_API_URL}/auth/google/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ access_token: account.access_token }),
          });
          if (resp.ok) {
            const data = await resp.json();
            token.accessToken = data.key; // DRF token
            token.userId = data.user?.pk?.toString();
            token.role = data.user?.role;
            token.email = data.user?.email;
            token.name = data.user?.username;
          } else {
            console.error('Backend token exchange failed', await resp.text());
          }
        } catch (e) {
          console.error('Error exchanging Google token with backend', e);
        }
      }
      // keep previous data if already present
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