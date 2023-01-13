import axios from "axios";
import { CartContext } from "context";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { getType, translateType } from "utils";
import { IFrame } from "components/manage";
import clsx from "clsx";

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
    var access = document.getElementById(String(scrollIndex));
    access?.scrollIntoView({ behavior: "smooth" }, true);
    router.push(`#${scrollIndex}`);
  };
  const decrement = (item) => {
    dispatch({ type: "DECREMENT", item });
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
    searchArtists("The Weekend Starboy");
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

    // let c = 0;
    // const interval = setInterval(() => {
    //   var access = document.getElementById(String(++c % items.length));
    //   access.scrollIntoView({ behavior: "smooth" }, true);
    // }, 5000);

    return () => {
      window.removeEventListener("scroll", scroll);
      // clearInterval(interval);
    };
  }, [items]);

  const [search, setSearch] = useState(false);

  return (
    <div className="w-screen h-screen flex flex-col md:flex-row">
      <div
        className="w-screen md:w-1/2 h-[25%] md:h-screen grid px-0 md:px-8 py-8 md:py-0 overflow-auto no-scrollbar snap-both snap-mandatory"
        id="wrapper"
      >
        <div className="w-full h-full flex flex-row md:flex-col">
          {items.map((item, i) => (
            <div
              className={`w-screen md:w-full h-full md:h-screen snap-center relative bg-white`}
              id={i}
            >
              <div className="w-full h-full grid place-items-center">
                <div className="relative flex items-center">
                  <img
                    className="absolute -top-[5vh] md:top-0 left-0 md:-left-[5vh] animate-spin"
                    src="/record.png"
                  />
                  <div
                    className="w-[10vh] md:w-[25vh] aspect-square rounded-[12px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] z-10 group bg-cover hover:scale-105 transition-all duration-300"
                    style={{ backgroundImage: `url(${item.image})` }}
                  ></div>
                </div>
              </div>

              {/* <div className="absolute bottom-[18.75vh] w-full  h-auto md:translate-y-1/2 hidden md:grid place-items-center">
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
          {/* {Object.keys(items).length === 0 && (
            <div className="w-full h-full grid place-items-center">
              <span className="font-serif md:text-2xl text-center">
                Nincsenek termékek a kosaradban
              </span>
            </div>
          )} */}
        </div>
      </div>
      <div className="w-screen md:w-1/2 h-[75%] md:h-screen grid place-items-center shadow-[15px_0_30px_0_rgba(0,0,0,0.18)] overflow-y-auto">
        {/* {state === "DEFAULT" && (
          <form className="w-full flex flex-col gap-8">
            <button
              className="h-12 rounded-[12px] text-white bg-black"
              onClick={() => setState("SEARCH")}
              type="button"
            >
              Lemez hozzáadása
            </button>
            <div className="flex flex-col gap-4">
              {items.map((item) => {
                const tag = item.url.split("open.spotify.com")[1].substring(1);
                return (
                  <div
                    className="flex items-center justify-between gap-4"
                    key={item.url}
                  >
                    <IFrame tag={tag} />
                    <button
                      className="flex-1 h-[80px] rounded-[12px] aspect-square shadow-lg"
                      onClick={() => decrement(item)}
                      type="button"
                    >
                      -
                    </button>
                  </div>
                );
              })}
              {items.length === 0 && (
                <span className="shadow-lg h-[80px] rounded-[12px] grid place-items-center">
                  A kosarad üres
                </span>
              )}
            </div>

            <button
              className="h-12 rounded-[12px] text-white bg-black"
              onClick={checkout}
              type="button"
            >
              Fizetés
            </button>
          </form>
        )}
        {state === "SEARCH" && (
          <form className="w-full flex flex-col gap-8">
            <input
              className="w-full h-12 rounded-[12px] border border-black shadow-lg text-center"
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
                    className="flex items-center justify-between gap-4"
                    key={key}
                  >
                    <IFrame tag={suri} />
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
            <button
              className="h-12 rounded-[12px] text-white bg-black"
              onClick={() => setState("DEFAULT")}
              type="button"
            >
              Vissza
            </button>
          </form>
        )} */}
        <div className="w-full h-full flex flex-col justify-between overflow-y-hidden">
          <div className="w-full h-full relative overflow-hidden">
            <div className="w-full h-full overflow-y-auto grid place-items-center overflow-hidden">
              default
            </div>
            <div
              className={clsx(
                "w-full h-full overflow-y-auto bg-white transition-all duration-200 grid place-items-center",
                state === "SEARCH" ? "-translate-y-full" : "translate-y-0"
              )}
            >
              <div className="w-full flex flex-col items-center justify-center gap-8 p-8">


                <input
                  className="w-full h-12 rounded-[12px] border-2 border-black shadow-lg text-center"
                  onChange={(e) => {
                    searchArtists(e.target.value);
                  }}
                />
                <div className="w-full grid lg:grid-cols-2 gap-8">
                  {Object.keys(searchJSON).map((key) => {
                    const url = searchJSON[key].items[0].external_urls.spotify;
                    const suri = searchJSON[key].items[0].uri
                      .substring(8)
                      .replace(":", "/");

                    return (
                      <div className="flex flex-col rounded-[12px] hover:scale-105 transition-all">
                        <IFrame tag={suri} key={key} />
                        <button
                          className="h-8 rounded-[12px] aspect-square shadow-lg"
                          onClick={() => addFinal(url)}
                          type="button"
                        >
                          <span className="capitalize">
                            {translateType(key.slice(0, -1))} hozzáadása
                          </span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
              </div>

          </div>

          <div className="w-full flex flex-col lg:flex-row gap-4 lg:gap-8 p-8 border-t">
            {state === "DEFAULT" && (
              <button
                className="w-full h-12 rounded-[12px] text-white bg-black"
                onClick={() => setState("SEARCH")}
              >
                Kereső megnyitása 🔎
              </button>
            )}
            {state === "SEARCH" && (
              <button
                className="w-full h-12 rounded-[12px] border-2 border-black"
                onClick={() => setState("DEFAULT")}
              >
                Vissza ⬅️
              </button>
            )}
            <button
              className="w-full h-12 rounded-[12px] text-white bg-black"
              onClick={checkout}
            >
              Fizetés 💰
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customize;
