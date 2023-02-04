import { AuthProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
// import "./custom/images/icons/favicon.ico";
// import "./custom/vendor/bootstrap/css/bootstrap.min.css";
// import "./custom/fonts/font-awesome-4.7.0/css/font-awesome.min.css";
// import "./custom/vendor/animate/animate.css";
// import "./custom/vendor/css-hamburgers/hamburgers.min.css";
// import "./custom/vendor/select2/select2.min.css";
// import "./custom/css/util.css";
// import "./custom/css/main.css";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
