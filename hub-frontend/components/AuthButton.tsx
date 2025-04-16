import { useSession, signIn, signOut } from 'next-auth/react';

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <button disabled>Loading...</button>;
  }

  if (session) {
    return (
      <>
        {session.user?.email} ({session.user?.role || 'User'}) <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      {/* Use the ID defined in [...nextauth].ts */}
      <button onClick={() => signIn('synchub-backend-google')}>Sign in with Google</button>
    </>
  );
} 