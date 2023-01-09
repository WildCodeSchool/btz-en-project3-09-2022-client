import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import UserContextProvider from "../src/context/UserContext";

const reactQueryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <QueryClientProvider client={reactQueryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <div className="h-screen w-screen flex-x-center">
            <Component {...pageProps} />
          </div>
        </Hydrate>
      </QueryClientProvider>
    </UserContextProvider>
  );
}
