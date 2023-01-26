/* eslint-disable @typescript-eslint/ban-types */
import "../styles/globals.css";
import "../styles/quill.snow.css";
import { ReactElement, ReactNode, useEffect } from "react";
import type { AppProps } from "next/app";
import Router from "next/router";
import NProgress from "nprogress";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { NextPage } from "next";
// eslint-disable-next-line import/no-named-as-default
import UserContextProvider from "../src/context/UserContext";
import { ModalWrapper } from "../src/context/ModalContext";
import "nprogress/nprogress.css";
import Welcome from "../src/components/Welcome";
import { ModalWrapperSpace } from "../src/context/ModalContextCategory";

export const reactQueryClient = new QueryClient();

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();
    Router.events.on("routeChangeStart", handleRouteStart);
    Router.events.on("routeChangeComplete", handleRouteDone);
    Router.events.on("routeChangeError", handleRouteDone);

    return () => {
      // Make sure to remove the event handler on unmount!
      Router.events.off("routeChangeStart", handleRouteStart);
      Router.events.off("routeChangeComplete", handleRouteDone);
      Router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);

  return (
    <UserContextProvider>
      <title>Enedis Share VDL</title>
      <ModalWrapper>
        <ModalWrapperSpace>
          <QueryClientProvider client={reactQueryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <Welcome />
              {getLayout(<Component {...pageProps} />)}
            </Hydrate>
          </QueryClientProvider>
        </ModalWrapperSpace>
      </ModalWrapper>
    </UserContextProvider>
  );
}
