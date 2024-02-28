import axios from "axios";

axios.interceptors.request.use(
  function (config) {
    const { origin } = new URL(config.url);
    const allowedOrigin = [process.env.REACT_APP_BASE_ENDPOINT];

    const token = localStorage.getItem("access-token");

    if (allowedOrigin.includes(origin)) {
      config.headers.authorization = token;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

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

export const fetchLogIn = async (input) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASE_ENDPOINT}/auth/login`,
    input
  );
  return data;
};
export const FetchMe = async () => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_ENDPOINT}/auth/me`
  );
  return data;
};

export const fetchLogout = async () => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASE_ENDPOINT}/auth/logout`,
    { refresh_token: localStorage.getItem("access-refresh") }
  );
  return data;
};

export const postOrder = async (input) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASE_ENDPOINT}/order`,
    input
  );
  return data;
};
