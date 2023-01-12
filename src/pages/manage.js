import axios from "axios";
import { CartContext } from "context";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { getType, getUUID, translateType } from "utils";

const Customize = () => {
  const { items, dispatch } = useContext(CartContext);
  const router = useRouter();

  const [index, setIndex] = useState(0);
  const [state, setState] = useState("DEFAULT");
  const [spotify, setSpotify] = useState({});
  const [searchJSON, setSearchJSON] = useState([]);

  const checkout = async () => {
    console.log(items);
    const { data } = await axios.post("/api/checkout", {
      items,
    });
    router.push(data);
    console.log(items);
  };
  const append = async (item) => {
    await dispatch({ type: "APPEND", item });
    let scrollIndex = items.findIndex((elem) => elem.url === item.url);
    if (scrollIndex === -1) scrollIndex = Object.keys(items).length;
    router.push(`#${scrollIndex}`);
  };
  const decrement = (item) => {
    dispatch({ type: "DECREMENT", item });
  };
  const focus = (i) => {
    router.push(`#${i}`);
  };
  const searchArtists = async (word) => {
    checkSpotify();
    try {
      const { data } = await axios.get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${spotify.token}`,
        },
        params: {
          q: word,
          type: "track,artist,album,playlist",
          limit: 1,
        },
      });
      setSearchJSON({
        tracks: data.tracks,
        albums: data.albums,
        playlists: data.playlists,
        artists: data.artists,
      });
    } catch {
      console.log("error");
    }
  };
  const addFinal = async (url) => {
    try {
      const { data } = await axios("https://open.spotify.com/oembed", {
        params: {
          url,
        },
      });
      append({
        url,
        title: data.title,
        image: data.thumbnail_url,
        type: getType(url),
      });
    } catch (error) {
      console.log(error);
    }
  };
  const checkSpotify = () => {
    const redirect = () => router.push("/login");
    const spotifyStorage = window.localStorage.getItem("spotify");
    if (spotifyStorage) {
      const spotifyJSON = JSON.parse(spotifyStorage);
      setSpotify(spotifyJSON);
      if (new Date().getTime() > spotifyJSON.expiration) {
        redirect();
      }
    } else redirect();
  };

  useEffect(() => {
    checkSpotify();
  }, []);
  useEffect(() => {
    const wrapper = document.getElementById("wrapper");
    const scroll = () => {
      if (window.innerWidth < 768)
        setIndex(
          Math.round(
            (wrapper.scrollLeft / wrapper.scrollWidth) *
              Object.keys(items).length
          )
        );
      else
        setIndex(
          Math.round(
            (wrapper.scrollTop / wrapper.scrollHeight) *
              Object.keys(items).length
          )
        );
    };
    wrapper.addEventListener("scroll", scroll);
    scroll();
    return () => {
      window.removeEventListener("scroll", scroll);
    };
  }, [items]);

  return (
    <div className="w-screen h-screen flex flex-col lg:flex-row">
      <div
        className="flex-1 grid px-0 lg:px-8 py-8 lg:py-0 overflow-auto snap-both snap-mandatory"
        id="wrapper"
      >
        <div className="w-full h-full flex flex-row lg:flex-col">
          {items.map((item, i) => (
            <div
              className={`w-screen lg:w-full h-full lg:h-screen snap-center relative bg-white`}
              id={i}
            >
              <div className="w-full h-full grid place-items-center">
                <div className="relative flex items-center">
                  <img
                    className="absolute -top-[5vh] lg:top-0 left-0 lg:-left-[5vh] animate-spin"
                    src="/record.png"
                  />
                  <div
                    className="w-[10vh] lg:w-[25vh] aspect-square rounded-[12px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] z-10 group bg-cover hover:scale-105 transition-all duration-300"
                    style={{ backgroundImage: `url(${item.image})` }}
                  ></div>
                </div>
              </div>

              {/* <div className="absolute bottom-[18.75vh] w-full  h-auto lg:translate-y-1/2 hidden lg:grid place-items-center">
                <div className="flex flex-col gap-4 items-center">
                  <span>{item.title}</span>
                  <div className="flex w-16 justify-between">
                    <button onClick={() => decrement(item)}>-</button>

                    <span>{item.quantity}</span>
                    <button onClick={() => append(item)}>+</button>
                  </div>
                </div>
              </div> */}
            </div>
          ))}
          {Object.keys(items).length === 0 && (
            <div className="w-full h-full grid place-items-center">
              <span className="font-serif md:text-2xl text-center">
                Nincsenek termékek a kosaradban
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="flex-[5_5_0%] lg:flex-1 grid place-items-center p-8 shadow-[15px_0_30px_0_rgba(0,0,0,0.18)]">
        {state === "DEFAULT" && (
          <div className="w-full flex flex-col gap-8 max-w-sm">
            {Object.keys(items).length > 0 && (
              <div className="flex flex-col gap-4">
                {items.map((item, i) => (
                  <div className="flex items-center justify-between gap-8 px-4">
                    <button
                      className={`capitalize ${
                        i === index ? "underline font-medium" : ""
                      }`}
                      onClick={() => focus(i)}
                    >
                      {item.title} ({translateType(item.type)})
                    </button>
                    <div className="w-[20%] flex justify-between">
                      <button onClick={() => decrement(item)}>-</button>

                      <span>{item.quantity}</span>
                      <button onClick={() => append(item)}>+</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {Object.keys(items).length > 0 && <span className="border-b" />}
            <div className="flex justify-between gap-8 flex-col md:flex-row">
              <button
                className="md:flex-1 h-12 rounded-full text-white bg-black"
                onClick={() => setState("SEARCH")}
              >
                Lemez Hozzáadása
              </button>
              {Object.keys(items).length > 0 && (
                <button
                  className="md:flex-1 h-12 rounded-full text-white bg-black"
                  onClick={checkout}
                  disabled={Object.keys(items).length === 0}
                >
                  Fizetés
                </button>
              )}
            </div>
          </div>
        )}
        {state === "SEARCH" && (
          <form className="w-full">
            <input
              className="border border-black text-center"
              type="text"
              onChange={(e) => {
                searchArtists(e.target.value);
              }}
            />
            <div className="flex flex-col gap-4">
              {Object.keys(searchJSON).map((key) => {
                const url = searchJSON[key].items[0].external_urls.spotify;
                const suri = searchJSON[key].items[0].uri
                  .substring(8)
                  .replace(":", "/");

                return (
                  <div
                    className="flex items-center justify-between gap-8"
                    key={key}
                  >
                    {/* th-[152px] */}
                    <iframe
                      className="flex-grow h-[80px] rounded-[12px] shadow-lg"
                      src={`https://open.spotify.com/embed/${suri}`}
                      allowFullScreen=""
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                    />
                    <button
                      className="flex-none h-[80px] rounded-[12px] aspect-square shadow-lg"
                      onClick={() => addFinal(url)}
                      type="button"
                    >
                      +
                    </button>
                  </div>
                );
              })}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Customize;
