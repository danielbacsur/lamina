import axios from "axios";
import { useRouter } from "next/router";
import { CartContext } from "context";
import { useContext, useEffect } from "react";
import { getType, getUUID } from "utils";

const Cart = () => {
  const router = useRouter();
  const { items, dispatch } = useContext(CartContext);

  const defaults = [
    {
      title: "Starboy",
      url: "https://open.spotify.com/track/7MXVkk9YMctZqd1Srtv4MB",
      image: "https://m.media-amazon.com/images/I/819e05qxPEL.jpg",
    },
    {
      title: "Redbone",
      url: "https://open.spotify.com/track/0WtDGnWL2KrMCk0mI1Gpwz",
      image: "https://m.media-amazon.com/images/I/81aYuDTpo3L.jpg",
    },
  ];

  const append = (item) => {
    dispatch({ type: "APPEND", item });
  };
  const decrement = (item) => {
    dispatch({ type: "DECREMENT", item });
  };

  const checkout = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("/api/checkout", {
      items,
    });
    router.push(data);
    console.log(items);
  };

  const customize = () => {
    router.push("/customize");
  };

  return (
    <>
      <form onSubmit={checkout}>
        <button type="submit">Checkout</button>
      </form>
      <br />
      <button
        onClick={() => {
          append(defaults[0]);
          append(defaults[1]);
        }}
      >
        Append
      </button>

      <div className="container max-w-lg mx-auto flex flex-col space-y-8">
        {items.map((item) => (
          <div className="flex items-center justify-between space-x-8">
            <img
              className="flex-none w-16 aspect-square rounded-[8px]"
              src={item.image}
            />
            <div className="flex-auto flex flex-col">
              <span className="font-serif text-lg">{item.title}</span>
              <span className="text-sm">{getType(item.url)}</span>
            </div>
            <div className="w-20 flex justify-between space-x-4">
              <button onClick={() => decrement(item)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => append(item)}>+</button>
            </div>
          </div>
        ))}
        <button
          className="w-16 aspect-square bg-gray-200 rounded-[8px]"
          onClick={customize}
        >
          +
        </button>
      </div>
    </>
  );
};

export default Cart;
