import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    const date = new Date();
    const hash = window.location.hash;
    const spotify = JSON.parse(window.localStorage.getItem("spotify"));
    if (hash) {
      const token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      const expiration = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("expires_in"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem(
        "spotify",
        JSON.stringify({
          token,
          expiration: parseInt(expiration) * 1000 + date.getTime(),
        })
      );
    }
    if (spotify?.expiration > date.getTime())
      setInterval(() => {
        router.push("/manage");
      }, 1000);
  }, []);

  const spotifyOAuth = async () => {
    const { data } = await axios.post("api/oauth");
    router.push(data);
  };

  return (
    <div className="w-screen h-screen flex flex-col md:flex-row">
      <div className="flex-1 grid place-items-center p-8">
        <span className="font-serif text-2xl text-center">
          Válassz platformot a folytatáshoz.
        </span>
      </div>
      <div className="flex-1 grid place-items-center p-8 shadow-[15px_0_30px_0_rgba(0,0,0,0.18)]">
        <button
          className="h-12 px-8 font-serif text-white bg-[#1db954] rounded"
          onClick={spotifyOAuth}
        >
          Spotify
        </button>
      </div>
    </div>
  );
};

export default Index;
