import '../styles/globals.scss'

import type { ReactChild, ReactElement, ReactNode } from 'react'
import { AuthenticationContextProvider } from '../store/AuthenticationContext'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { QuestionContextProvider } from '../store/QuestionContext'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactChild
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  const MockServer = () => import('../../mocks');
  MockServer();
}

const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
  cache,
});

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <ApolloProvider client={client}>
      <AuthenticationContextProvider>
        <QuestionContextProvider>
          {getLayout(<Component {...pageProps} />)}
        </QuestionContextProvider>
      </AuthenticationContextProvider>
    </ApolloProvider>
  )
}
