import axios from "axios";

export const fetchProductList = async () => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_ENDPOINT}/product`
    );
    return data;
  } catch (error) {
    console.log("Hata");
    alert("HATAAAA");
  }
};

export const fetchProductDetail = async (id) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_ENDPOINT}/product/${id}`
    );
    return data;
  } catch (error) {
    console.log("fetchProductDetail", error);
  }
};
