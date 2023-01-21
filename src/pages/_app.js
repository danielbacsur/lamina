import CartProvider from "context/cart";
import PlatformProvider from "context/platform";
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
    <PlatformProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </PlatformProvider>
  );
}

export default MyApp;
