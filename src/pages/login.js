import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    const date = new Date();
    const hash = window.location.hash;
    const spotify = JSON.parse(window.localStorage.getItem("spotify"));
    console.log(spotify);
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
    if (spotify?.expiration > date.getTime()) router.push("/manage");
  }, []);

  const spotifyOAuth = async () => {
    const { data } = await axios.post("api/oauth");
    router.push(data);
  };

  return (
    <div className="w-screen h-screen flex flex-col lg:flex-row">
      <div className="flex-1 grid place-items-center p-8">
        <span className="font-serif text-2xl text-center">
          Válassz platformot a folytatáshoz.
        </span>
      </div>
      <div className="flex-1 grid place-items-center p-8 shadow-[15px_0_30px_0_rgba(0,0,0,0.18)]">
        <div className="flex flex-col gap-8">
          <button
            className="h-12 px-8 font-serif text-white bg-[#1db954] rounded-full"
            onClick={spotifyOAuth}
          >
            Spotify
          </button>
          {/* <button
            className="h-12 px-8 font-serif text-white bg-black rounded-full"
            onClick={spotifyOAuth}
          >
            Apple Music
          </button>
          <button
            className="h-12 px-8 font-serif text-black bg-[#ff8800] rounded-full"
            onClick={spotifyOAuth}
          >
            SoundCloud
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Index;
