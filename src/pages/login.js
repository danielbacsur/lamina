import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    const spotify = window.localStorage.getItem("spotify");

    if (hash) {
      console.log(hash);
      const token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("spotify", token);
    }

    if (spotify) router.push("/cart");
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
        <div className="flex flex-col gap-8">
          <button
            className="h-12 px-8 font-serif text-white bg-[#1db954] rounded-full"
            onClick={spotifyOAuth}
          >
            Spotify
          </button>
          <button
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
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
