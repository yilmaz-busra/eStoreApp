import { createContext, useContext, useEffect, useState } from "react";

const BasketContext = createContext();

const BasketProvider = ({ children }) => {
  const defaultBasket = JSON.parse(localStorage.getItem("basket")) || [];

  const [items, setItems] = useState(defaultBasket);

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(items));
  }, [items]);

  const addtoBasket = (item, findBasketItem) => {
    if (!findBasketItem) {
      return setItems((prev) => [...prev, item]);
    }

    const filtered = items.filter((item) => item._id !== findBasketItem._id);
    setItems(filtered);
  };

  const removeFromBasket = (item_id) => {
    const filtered = items.filter((item) => item._id !== item_id);
    setItems(filtered);
  };

  const clearBasket = () => {
    setItems([]);
  };
  const values = {
    addtoBasket,
    items,
    setItems,
    removeFromBasket,
    clearBasket,
  };
  return (
    <BasketContext.Provider value={values}>{children}</BasketContext.Provider>
  );
};

const useBasket = () => useContext(BasketContext);

export { useBasket, BasketProvider };
