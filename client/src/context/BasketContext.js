import { createContext, useContext, useState } from "react";

const BasketContext = createContext();

const BasketProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addtoBasket = (item, findBasketItem) => {
    if (!findBasketItem) {
      return setItems((prev) => [...prev, item]);
    }
    const filtered = items.filter((item) => item._id !== findBasketItem._id);
    setItems(filtered);
  };
  const values = {
    addtoBasket,
    items,
    setItems,
  };
  return (
    <BasketContext.Provider value={values}>{children}</BasketContext.Provider>
  );
};

const useBasket = () => useContext(BasketContext);

export { useBasket, BasketProvider };
