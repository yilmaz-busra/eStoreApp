import axios from "axios";

export const fetchProductList = async ({ pageParam = 0 }) => {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_ENDPOINT}/product?page=${pageParam}`
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

export const fetchRegister = async (input) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASE_ENDPOINT}/auth/register`,
    input
  );
  return data;
};
