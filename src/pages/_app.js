import "../styles/global.css";
import { AuthProvider } from "../contexts/AuthProvider";

import MainComponent from "@/components/MainComponent";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <MainComponent>
        <Component {...pageProps} />
      </MainComponent>
    </AuthProvider>
  );
}
