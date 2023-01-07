import React, { createContext, useEffect, useReducer, useState } from "react";

export const MAX_AMOUNT_PER_ITEM = 5;

function reducer(items, action) {
  if (action.type === "RECOVER") {
    return action.item;
  } else if (action.type === "APPEND") {
    return items.find((item) => item.id === action.item.id)
      ? items.map((item) =>
          item.title === action.item.title
            ? {
                ...item,
                quantity: item.quantity + 1,
                price: Math.floor(
                  (5000 * (item.quantity + 1) - item.quantity * 1000) /
                    (item.quantity + 1)
                ),
              }
            : item
        )
      : [...items, {...action.item, quantity: 1, price: 5000 }];
  } else if (action.type === "DECREMENT") {
    return items.find((item) => item.title === action.item.title)?.quantity ===
      1
      ? items.filter((item) => item.title !== action.item.title)
      : items.map((item) =>
          item.name === action.item.name
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        );
  } else if (action.type === "REMOVE") {
    return items.filter((item) => item.id !== action.item.id);
  } else {
    return items;
  }
}

export const CartContext = createContext();

const recovery = new Array() ;
const CartProvider = ({ children }) => {
  const [items, dispatch] = useReducer(reducer, recovery);

  useEffect(() => {
    dispatch({
      type: "RECOVER",
      item: JSON.parse(localStorage.getItem("items")),
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
