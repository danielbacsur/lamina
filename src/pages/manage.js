import axios from "axios";
import { CartContext } from "context";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { getType, getUUID } from "utils";

const Customize = () => {
  const { items: origin, dispatch } = useContext(CartContext);
  const router = useRouter();

  const items = origin;

  const [temp, setTemp] = useState({
    image: "https://m.media-amazon.com/images/I/819e05qxPEL.jpg",
  });

  const checkout = async () => {
    const { data } = await axios.post("/api/checkout", {
      items,
    });
    router.push(data);
    console.log(items);
  };

  const update = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios("https://open.spotify.com/oembed", {
        params: {
          url: e.target.value,
        },
      });

      setTemp({
        title: data.title,
        url: e.target.value,
        image: data.thumbnail_url,
        platform: "spotify",
        type: getType(e.target.value),
        uuid: getUUID(e.target.value),
      });
      console.log("updated");
      console.log(temp);
    } catch (error) {
      console.log(error);
    }
  };

  const [index, setIndex] = useState(0);

  const append = async (item) => {
    await dispatch({ type: "APPEND", item });
    let scrollIndex = items.findIndex((elem) => elem.url === item.url);
    if (scrollIndex === -1) scrollIndex = Object.keys(items).length;
    router.push(`#${scrollIndex}`);
  };
  const decrement = (item) => {
    dispatch({ type: "DECREMENT", item });
  };

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

  const focus = (i) => {
    router.push(`#${i}`);
  };

  const [state, setState] = useState("DEFAULT");

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
                    className="absolute -top-[4vw] lg:top-0 left-0 lg:-left-[4vw] -z-10 animate-spin"
                    src="record.png"
                  />
                  <div
                    className="w-[10vh] lg:w-[25vh] aspect-square rounded-[12px] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] group bg-cover hover:scale-105 transition-all duration-300"
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
                      {item.title} - {item.type}
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
                onClick={() => setState("CUSTOMIZE")}
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
        {state === "CUSTOMIZE" && (
          <form className="w-full flex flex-col gap-8 max-w-sm">
            <label for="email" class="sr-only">
              Dal / Album / Playlist / Előadó
            </label>
            <input
              type="url"
              class="w-full h-12 px-4 rounded-full border border-gray-500 text-center"
              placeholder="Dal / Album / Playlist / Előadó"
              onChange={update}
            />
            <span className="border-b" />
            <div className="flex justify-between gap-8 flex-col md:flex-row">
              <button
                className="md:flex-1 h-12 rounded-full border border-black"
                onClick={() => setState("DEFAULT")}
              >
                Vissza
              </button>
              <button
                className="md:flex-1 h-12 rounded-full bg-black text-white"
                onClick={() => {
                  append(temp);
                  setState("DEFAULT");
                }}
              >
                Hozzáadás
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Customize;
