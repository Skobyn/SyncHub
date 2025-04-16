import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css'; // Use relative path from pages directory

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp; 