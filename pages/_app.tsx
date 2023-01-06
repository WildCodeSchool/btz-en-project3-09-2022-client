import "../styles/globals.css";
import type { AppProps } from "next/app";
import UserContextProvider from "../src/context/UserContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <Component {...pageProps} />
    </UserContextProvider>
  );
}
