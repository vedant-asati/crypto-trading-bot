import "../styles/globals.css";

//internal import
import { Provider } from "../context/context";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Provider>
        <Component {...pageProps} />
      </Provider>

      {/* <script type="text/javascript" src="js/jquery.js?ver=1.0.0" ></script>
      <script type="text/javascript" src="js/plugins.js?ver=1.0.0" ></script>
      <script type="text/javascript" src="js/init.js?ver=1.0.0" ></script> */}
    </>
  );
}
