import { usePlatforms } from "context/platforms";
import { useEffect } from "react";

const { useRouter } = require("next/router");

const Login = () => {
  const router = useRouter();
  const { platforms, dispatch: platformsDispatch } = usePlatforms();

  useEffect(() => {
    if(window.location.search.substring(1) === "error=access_denied") {
        router.push(`${window.location.origin}/product`)
    }
    // if (router.query.platform === "spotify") {
    //   if (window.location.hash) {
    //     const token = window.location.hash
    //       .substring(1)
    //       .split("&")
    //       .find((elem) => elem.startsWith("access_token"))
    //       .split("=")[1];
    //     const expiration = window.location.hash
    //       .substring(1)
    //       .split("&")
    //       .find((elem) => elem.startsWith("expires_in"))
    //       .split("=")[1];

    //     platformsDispatch({ type: "SPOTIFY", token: token, expiration: expiration });
    //     router.push(`product#${router.query.platform}`)
    //   } else {
    //     let redirect = process.env.NEXT_PUBLIC_SPOTYFY_AUTH_ENDPOINT;
    //     redirect += `?client_id=${process.env.NEXT_PUBLIC_SPOTYFY_CLIENT_ID}`;
    //     redirect += `&redirect_uri=${window.location.href}`;
    //     redirect += `&response_type=${process.env.NEXT_PUBLIC_SPOTYFY_RESPONSE_TYPE}`;
    //     router.push(redirect);
    //   }
    // }
  }, [router]);
};

export default Login;
