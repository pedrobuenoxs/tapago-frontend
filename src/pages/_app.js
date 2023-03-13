import "../styles/global.css";

import MainComponent from "@/components/MainComponent";

export default function App({ Component, pageProps }) {
  return (
    <MainComponent>
      <Component {...pageProps} />
    </MainComponent>
  );
}
