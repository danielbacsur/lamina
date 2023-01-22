import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

export const MAX_AMOUNT_PER_ITEM = 5;

const price = (quantity) =>
  Math.floor((40 * quantity - (quantity - 1) * 10) / quantity) * 100;

function reducer(items, action) {
  if (action.type === "RECOVER") {
    return action.items;
  } else if (action.type === "APPEND") {
    return items.find((item) => item.url === action.item.url)
      ? items.map((item) =>
          item.url === action.item.url
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      : [...items, { ...action.item, quantity: 1 }];
  } else if (action.type === "DECREMENT") {
    return items.find((item) => item.url === action.item.url)?.quantity === 1
      ? items.filter((item) => item.url !== action.item.url)
      : items.map((item) =>
          item.url === action.item.url
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        );
  } else if (action.type === "REMOVE") {
    return items.filter((item) => item.url !== action.item.url);
  } else {
    return items;
  }
}

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const recovery = [];
const CartProvider = ({ children }) => {
  const [items, dispatch] = useReducer(reducer, recovery);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("items")) === null) return;
    dispatch({
      type: "RECOVER",
      items: JSON.parse(localStorage.getItem("items")),
    });
  }, []);

  useEffect(() => {
    if (items === recovery && localStorage.getItem("items")?.length > 0) return;
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <CartContext.Provider value={{ items, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
