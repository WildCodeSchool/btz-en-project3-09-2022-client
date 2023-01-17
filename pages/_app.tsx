/* eslint-disable @typescript-eslint/ban-types */
import "../styles/globals.css";
import { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { NextPage } from "next";
import UserContextProvider from "../src/context/UserContext";

export const reactQueryClient = new QueryClient();

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <UserContextProvider>
      <QueryClientProvider client={reactQueryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          {getLayout(<Component {...pageProps} />)}
        </Hydrate>
      </QueryClientProvider>
    </UserContextProvider>
  );
}
