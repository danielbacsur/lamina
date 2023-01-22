import CartProvider from "context/cart";
import FormProvider from "context/form";
import { useEffect } from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const setter = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight}px`
      );
      document.documentElement.style.setProperty(
        "--vw",
        `${document.body.offsetWidth - 1}px`
      );
    };
    setter();
    window.addEventListener("resize", setter);
    return () => window.removeEventListener("resize", setter);
  }, []);

  return (
    <FormProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </FormProvider>
  );
}

export default MyApp;
