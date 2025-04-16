import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import '@/styles/globals.css'; // Use path alias assuming styles is under src or root

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp; 