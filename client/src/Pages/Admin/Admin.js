import React from "react";
import { Link, Routes, Route } from "react-router-dom";

import Home from "./Home/Home";
import Orders from "./Orders/Orders.js";
import Products from "./Products/Products";
import Error from "../Error404/error.js";
import "../../Styles/admin.css";
import ProductDetaiil from "./ProductDetail/ProductDetaiil.js";
import NewProduct from "./Products/NewProduct.js";

function Admin() {
  return (
    <div>
      <nav>
        <ul className="admin-menu">
          <li>
            <Link to={"/admin"}>Home</Link>
          </li>
          <li>
            <Link to={"/admin/products"}>Products</Link>
          </li>
          <li>
            <Link to={"/admin/orders"}>Orders</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"orders"} element={<Orders />} />
        <Route path={"products"} element={<Products />} />
        <Route path={"products/:product_id"} element={<ProductDetaiil />} />
        <Route path={"products/newproduct"} element={<NewProduct />} />

        <Route path={"*"} element={<Error />} />
      </Routes>
    </div>
  );
}

export default Admin;
