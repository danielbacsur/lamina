import CartProvider from "context";
import { useEffect } from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const setter = () =>
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight}px`
      );
    window.addEventListener("resize", setter);
    setter();
    return () => window.removeEventListener("resize", setter);
  }, []);

  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}

export default MyApp;
