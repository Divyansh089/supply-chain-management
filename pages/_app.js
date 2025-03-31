import "../styles/globals.css";
import Head from "next/head";

// Internal Import
import { TrackingProvider } from "../Context/TrackingContext";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/android-chrome-512x512.png" />
        <title>QuickSafe</title>
      </Head>
      <TrackingProvider>
        <NavBar />
        <Component {...pageProps} />
      </TrackingProvider>
      <Footer />
    </>
  );
}
