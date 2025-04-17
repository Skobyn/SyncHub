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
      <button onClick={() => signIn('google')}>Sign in with Google</button>
    </>
  );
} 