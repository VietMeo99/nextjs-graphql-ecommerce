import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from './index';

interface QueryProviderProps {
  pageProps: AppProps['pageProps'];
}
export default function QueryProvider({
  pageProps,
  children,
}: React.PropsWithChildren<QueryProviderProps>) {
  const apolloClient = useApollo(pageProps);
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
