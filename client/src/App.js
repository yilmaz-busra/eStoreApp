import { Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./Components/Navbar";
import SignUp from "./Pages/Auth/SignUp";
import Login from "./Pages/Auth/Login";
import Products from "./Pages/Products/Products";
import ProductDetail from "./Pages/ProductDetail";
import Profile from "./Pages/Profile";
import ProtectedRoute from "./Pages/ProtectedRoute";
import Basket from "./Pages/Basket/Basket.js";
import Error from "./Pages/Error404/error.js";
import Admin from "./Pages/Admin/Admin.js";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Products />} />
        <Route path={"/product/:product_id"} element={<ProductDetail />} />
        <Route path={"/signup"} element={<SignUp />} />
        <Route path={"/login"} element={<Login />} />
        <Route
          path={"/profile"}
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path={"/basket"} element={<Basket />} />

        <Route
          path={"/admin/*"}
          element={
            <ProtectedRoute panel={true}>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path={"*"} element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
