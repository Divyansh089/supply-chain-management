import "../styles/globals.css"

//Internal Import
import {TrackingProvider} from "../Context/TrackingContext";

//import {NavBar , Footer} from "../Components";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer"; 
export default function App({ Component, pageProps }) {
  return (
    <>
    <TrackingProvider>
      <NavBar/>
      <Component {...pageProps} />
    </TrackingProvider>
    <Footer/>
    </>

  );
}
