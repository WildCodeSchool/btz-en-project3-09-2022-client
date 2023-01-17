import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import Router from "next/router";
import NProgress from "nprogress";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserContextProvider from "../src/context/UserContext";
import "nprogress/nprogress.css";
import Welcome from "../src/components/Welcome";

export const reactQueryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
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
    <QueryClientProvider client={reactQueryClient}>
      <UserContextProvider>
        <Welcome />
        <Component {...pageProps} />
      </UserContextProvider>
    </QueryClientProvider>
  );
}
