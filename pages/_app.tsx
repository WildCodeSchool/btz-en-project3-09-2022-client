import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserContextProvider from "../src/context/UserContext";

const reactQueryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <QueryClientProvider client={reactQueryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </UserContextProvider>
  );
}
