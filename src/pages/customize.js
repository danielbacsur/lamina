import axios from "axios";
import { CartContext } from "context";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { getType, getUUID } from "utils";

const Customize = () => {
  const { dispatch } = useContext(CartContext);
  const router = useRouter();

  const [item, setItem] = useState({
    image: "https://m.media-amazon.com/images/I/819e05qxPEL.jpg",
  });

  const update = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios("https://open.spotify.com/oembed", {
        params: {
          url: e.target.value,
        },
      });

      setItem({
        title: data.title,
        url: e.target.value,
        image: data.thumbnail_url,
        platform: "spotify",
        type: getType(e.target.value),
        uuid: getUUID(e.target.value),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch({ type: "APPEND", item });
    router.push("/cart");
  };
  return (
    <div className="w-screen h-screen flex">
      <div className="flex-1 grid place-items-center">
        <form
          className="w-full max-w-lg flex flex-col items-center space-y-8 p-8"
          onSubmit={submit}
        >
          <input
            name="link"
            type="text"
            className="w-full border-b border-black outline-none text-center h-10 font-sserif"
            placeholder="Dal / Album / Playlist / Előadó"
            onChange={update}
          />
          <button
            className="bg-black font-serif text-white w-40 h-10 rounded-full"
            type="submit"
          >
            Kosárhoz adás
          </button>
        </form>
      </div>
      <div className="flex-1 grid place-items-center shadow-[15px_0_30px_0_rgba(0,0,0,0.18)]">
        <div className="relative flex items-center">
          {/* <span className="absolute -left-[4vw] w-[23vw] aspect-square bg-black rounded-full -z-10" /> */}
          <img
            className="absolute -top-[8vw] md:top-0 left-0 md:-left-[4vw] -z-10 animate-spin"
            src="record.png"
          />
          <div
            className="w-[50vw] md:w-[25vw] aspect-square rounded-[12px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] group bg-cover hover:scale-105 transition-all duration-300"
            style={{ backgroundImage: `url(${item.image})` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Customize;
