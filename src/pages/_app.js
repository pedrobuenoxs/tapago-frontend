// /src/pages/_app.js

import "../styles/global.css";
import { AuthProvider } from "../contexts/AuthProvider";
import { FeedProvider } from "@/contexts/FeedProvider";

import MainComponent from "@/components/MainComponent";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <MainComponent>
        <FeedProvider>
          <Component {...pageProps} />
        </FeedProvider>
      </MainComponent>
    </AuthProvider>
  );
}
