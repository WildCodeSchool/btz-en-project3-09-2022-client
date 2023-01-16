import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useWindowSize } from "usehooks-ts";
import UserContextProvider from "../src/context/UserContext";
import Footer from "../src/components/footer";

export const reactQueryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const { width } = useWindowSize();

  return (
    <UserContextProvider>
      <QueryClientProvider client={reactQueryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <div className="h-screen w-screen flex-x-center">
            <Component {...pageProps} />
          </div>

          {width < 768 && (
            <div className="absolute bottom-0 w-full">
              <Footer />
            </div>
          )}
        </Hydrate>
      </QueryClientProvider>
    </UserContextProvider>
  );
}
