import { Router, useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

const Cart = () => {
  const router = useRouter();
  const { status } = router.query;

  const [items, setItems] = useState([
    {
      name: "Starboy",
      description: "The Weekend",
      image:
        "https://m.media-amazon.com/images/I/819e05qxPEL.jpg",
      quantity: 1,
      price: 5000,
    },
    {
      name: "Redbone",
      description: "Childish Gambino",
      image:
        "https://m.media-amazon.com/images/I/81aYuDTpo3L.jpg",
      quantity: 2,
      price: 4750,
    },
  ]);

  const submit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("/api/checkout", {
      items: items,
    });
    router.push(data);
  };

  return (
    <>
      <form onSubmit={submit}>
        <button type="submit">Checkout</button>
      </form>
    </>
  );
};

export default Cart;
