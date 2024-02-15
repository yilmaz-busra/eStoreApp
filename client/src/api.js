import axios from "axios";

export const fetchProductList = async () => {
  try {
    const { data } = await axios.get("http://localhost:4000/product");
    return data;
  } catch (error) {
    console.log("Hata");
    alert("HATAAAA");
  }
};
