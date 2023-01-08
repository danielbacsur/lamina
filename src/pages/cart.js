import axios from "axios";
import { useRouter } from "next/router";
import { CartContext } from "context";
import { useContext, useEffect } from "react";
import { getType, getUUID } from "utils";

const Cart = () => {
  const router = useRouter();
  const { items, dispatch } = useContext(CartContext);

  useEffect(() => {
    const hash = window.location.hash

    if(hash) {
      console.log(hash)
      const token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
      window.location.hash = ""
      window.localStorage.setItem("spotify", token)
    }
  }, [])

  const append = (item) => {
    dispatch({ type: "APPEND", item });
  };
  const decrement = (item) => {
    dispatch({ type: "DECREMENT", item });
  };

  const checkout = async () => {
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
      <div className="container max-w-lg mx-auto flex flex-col space-y-8">
        {items.map((item) => (
          <div className="flex items-center justify-between space-x-8">
            <img
              className="flex-none w-16 aspect-square rounded-[8px]"
              src={item.image}
            />
            <div className="flex-auto flex flex-col">
              <span className="font-serif text-lg">{item.title}</span>
              <span className="text-sm text-gray-400">{item.platform} {getType(item.url)}</span>
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
        <button onClick={checkout}>Checkout</button>

      </div>
    </>
  );
};

export default Cart;
