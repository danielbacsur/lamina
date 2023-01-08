import axios from "axios";
import { CartContext } from "context";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { getType, getUUID } from "utils";

const Customize = () => {
  const { items: origin, dispatch } = useContext(CartContext);
  const router = useRouter();

  const items = origin;

  const [item, setItem] = useState({
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

  const check = () => Object.keys(items).length > 0;

  const current = () => {
    if (check()) return items[index];
  };

  const [index, setIndex] = useState(0);

  const append = (item) => {
    dispatch({ type: "APPEND", item });
    console.log(items.findIndex(elem => elem.url === item.url))
    router.push(`#${items.findIndex(elem => elem.url === item.url)}`)
  };
  const decrement = (item) => {
    dispatch({ type: "DECREMENT", item });
  };
  useEffect(() => {
    const valam = document.getElementById("scroll");
    const wrapper = document.getElementById("wrapper");
    wrapper.className = `flex flex-row md:flex-col w-[${
      Object.keys(items).length * 100
    }vw] md:w-auto`;
    const setter = () => {
      let ratio = 0;
      if (window.innerWidth < 768) ratio = valam.scrollLeft / valam.scrollWidth;
      else ratio = valam.scrollTop / valam.scrollHeight;
      setIndex(Math.round(ratio * Object.keys(items).length));
    };
    valam.addEventListener("scroll", setter);
    setter();
    return () => {
      window.removeEventListener("scroll", setter);
    };
  }, [items]);

  return (
    <div className="w-screen h-screen flex md:flex-row flex-col">
      <div
        className="flex-1 py-8 md:py-0 md:px-8 overflow-x-scroll md:overflow-x-hidden overflow-y-hidden md:overflow-y-scroll snap-x md:snap-y snap-mandatory"
        id="scroll"
      >
        <div className="FILLED_BY_JAVASCRIPT" id="wrapper">
          {items.map((item, i) => (
            <div className="h-auto md:h-screen w-screen md:w-auto grid place-items-center snap-center" id={i} key={i}>
              <div className="relative flex items-center">
                <img
                  className="absolute -top-[2vh] md:top-0 md:-left-[4vw] -z-10 animate-spin"
                  src="record.png"
                />
                <div
                  className="w-[10vh] md:w-[25vw] aspect-square rounded-lg overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] group bg-cover hover:scale-105 transition-all duration-300"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-[5_5_0%] md:flex-1 grid place-items-center p-8 shadow-[15px_0_30px_0_rgba(0,0,0,0.18)]">
        <div className="flex gap-8">
          <button onClick={() => decrement(current())}>-</button>
          {check() && <div>{current().title} ({current().quantity})</div>}
          <button onClick={() => append(current())}>+</button>
        </div>
        <a href="#1">test</a>
        <form className="w-full max-w-lg flex flex-col items-center space-y-8 p-8">
          <input
            name="link"
            type="text"
            className="w-full border-b border-black outline-none text-center h-10 font-sserif"
            placeholder="Dal / Album / Playlist / Előadó"
            onChange={update}
          />
          <button
            className="bg-black font-serif text-white w-40 h-10 rounded-full"
            type="button"
            onClick={() => append(item)}
          >
            Kosárhoz adás
          </button>
          <button
            className="bg-black font-serif text-white w-40 h-10 rounded-full"
            type="button"
            onClick={() => checkout()}
          >
            Fizetés
          </button>
        </form>
      </div>
    </div>
  );
};

export default Customize;
