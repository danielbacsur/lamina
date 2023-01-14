import axios from "axios";
import {
  Disclaimer,
  OrderButton,
  SearchBar,
  SearchInputBar,
  SearchResult,
  SearchResultsWrapper,
} from "components/manage";
import { CartContext } from "context";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { getType, translateType } from "utils";

const Customize = () => {
  const { items, dispatch } = useContext(CartContext);
  const router = useRouter();

  const [index, setIndex] = useState(0);
  const [spotify, setSpotify] = useState({});
  const [searchJSON, setSearchJSON] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const checkout = async () => {
    dispatch({ type: "PRICING" });
    console.log(items);
    const { data } = await axios.post("/api/checkout", {
      items,
    });
    router.push(data);
    console.log(items);
  };
  const append = (item) => {
    dispatch({ type: "APPEND", item });
    dispatch({ type: "PRICING" });
    setTimeout(() => {
      let scrollIndex = items.findIndex((elem) => elem.url === item.url);
      if (scrollIndex === -1) scrollIndex = items.length;
      var access = document.getElementById(String(scrollIndex));
      access?.scrollIntoView({ behavior: "smooth" }, true);
    }, 100);
  };
  const decrement = (item) => {
    if (item.quantity > 1) {
      let scrollIndex = items.findIndex((elem) => elem.url === item.url);
      var access = document.getElementById(String(scrollIndex));
      access?.scrollIntoView({ behavior: "smooth" }, true);
    }
    dispatch({ type: "DECREMENT", item });
    dispatch({ type: "PRICING" });
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
      if (items.length <= 1) setIndex(0);
      else if (window.innerWidth < 768)
        setIndex(
          Math.round(
            (wrapper.scrollLeft / (wrapper.scrollWidth - window.innerWidth)) *
              (Object.keys(items).length - 1)
          )
        );
      else
        setIndex(
          Math.round(
            (wrapper.scrollTop / (wrapper.scrollHeight - window.innerHeight)) *
              (Object.keys(items).length - 1)
          )
        );
    };
    wrapper.addEventListener("scroll", scroll);
    scroll();

    return () => window.removeEventListener("scroll", scroll);
  }, [items]);
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchArtists(searchTerm);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const SliderSpaceholder = () => (
    <div className="w-[25vw] md:w-full h-full md:h-[25vh] bg-white" />
  );

  return (
    <div className="w-screen h-screen flex flex-col md:flex-row">
      <div
        className="w-screen md:w-1/2 h-[20%] md:h-screen grid px-0 md:px-8 py-8 md:py-0 overflow-auto no-scrollbar snap-both snap-mandatory"
        id="wrapper"
      >
        <div className="w-full h-full flex flex-row md:flex-col relative">
          <SliderSpaceholder />
          {items.map((item, i) => (
            <div
              className={`w-[50vw] md:w-full h-full md:h-[50vh] snap-center relative bg-white`}
              id={i}
            >
              <div className="w-full h-full grid place-items-center">
                <div
                  className={`relative flex items-center group transition-all ${
                    index !== i && "scale-90"
                  }`}
                  // onClick={() => callb(item)}
                >
                  <img
                    className={`absolute md:top-0 left-0 transition-all duration-300 animate-spin ${
                      index === i
                        ? "-top-[2.5vh] md:-left-[5vh]"
                        : "top-0 md:left-0"
                    }`}
                    src="/record.png"
                  />
                  <div
                    className="w-[10vh] md:w-[25vh] aspect-square rounded overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] z-10 group bg-cover transition-all duration-300"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <div
                    className={`w-full hidden md:flex absolute -top-12 transition-all justify-center ${
                      index === i ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <span className="font-serif">{item.title}</span>
                  </div>
                  <div
                    className={`w-full hidden md:flex absolute -bottom-12 transition-all justify-between px-12 ${
                      index === i ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <button onClick={() => decrement(item)}>-</button>
                    <span className="font-serif">{item.quantity}</span>
                    <button onClick={() => append(item)}>+</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <SliderSpaceholder />
        </div>
      </div>
      <div className="w-screen md:w-1/2 h-[80%] md:h-screen shadow-[15px_0_30px_0_rgba(0,0,0,0.18)] overflow-auto p-8 flex flex-col items-center">
        <div className="w-full h-full flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <SearchBar onChange={setSearchTerm} />
            {Object.keys(searchJSON).map((key) => {
              const itemUrl = searchJSON[key]?.items[0]?.external_urls?.spotify;
              const imageUrl =
                key === "tracks"
                  ? searchJSON[key]?.items[0]?.album?.images[0]?.url
                  : searchJSON[key]?.items[0]?.images[0]?.url;

              return (
                <SearchResult
                  key={key}
                  src={imageUrl}
                  title={searchJSON[key]?.items[0]?.name}
                  text={`${translateType(key.slice(0, -1))} hozzáadása`}
                  onClick={() => addFinal(itemUrl)}
                />
              );
            })}
          </div>
          {/* <span className="md:hidden border-b border-black/50" /> */}
          <div className="w-full flex-1 flex flex-col justify-end gap-4">
            {items.map((item) => {
              return (
                <div className="md:hidden flex rounded shadow-lg overflow-hidden hover:scale-105 transition-all">
                  <div
                    className="w-12 h-12 aspect-square shadow-lg bg-cover bg-center transition-all"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  <div className="w-full flex items-center justify-between px-4">
                    <div className="flex flex-col">
                      <span className="font-serif">
                        {item.title.slice(0, 24)}
                      </span>
                      <span className="font-serif text-sm">
                        {translateType(item.type)}
                      </span>
                    </div>
                    <div className="w-16 flex justify-between">
                      <button onClick={() => decrement(item)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => append(item)}>+</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-2">
          <p className="text-sm text-center">
    Több termék renndelése esetében áraink olcsóbbak!
  </p>
            <OrderButton text={"Megrendelés"} onClick={checkout} />
          </div>
        </div>
      </div>
    </div>
  );
};


export default Customize;
