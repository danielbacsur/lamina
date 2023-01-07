import axios from "axios";
import { useRouter } from "next/router";
import { CartContext } from "context/cart";
import { useContext, useEffect } from "react";

const Cart = () => {
  const router = useRouter();
  const { mounted, items, dispatch } = useContext(CartContext);

  const defaults = [
    {
      id: 0,
      title: "Starboy",
      artist: "The Weekend",
      url: "https://open.spotify.com/track/7MXVkk9YMctZqd1Srtv4MB",
      image: "https://m.media-amazon.com/images/I/819e05qxPEL.jpg",
    },
    {
      id: 1,
      title: "Redbone",
      artist: "Childish Gambino",
      url: "https://open.spotify.com/track/0WtDGnWL2KrMCk0mI1Gpwz",
      image: "https://m.media-amazon.com/images/I/81aYuDTpo3L.jpg",
    },
  ];

  const append = () => {
    dispatch({ type: "APPEND", item: defaults[0] });
    dispatch({ type: "APPEND", item: defaults[1] });
  };

  const checkout = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("/api/checkout", {
      items,
    });
    router.push(data);
    console.log(items);
  };

  const handleAdd = () => {
    addItem(defaultProducts[0]);
  };
  return (
    <>
      <form onSubmit={checkout}>
        <button type="submit">Checkout</button>
      </form>
      <br />
      <button onClick={() => append()}>Append</button>
    </>
  );
};

export default Cart;
