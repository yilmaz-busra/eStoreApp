import { Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./Pages/Home";

import Navbar from "./Components/Navbar";
import Signin from "./Pages/Auth/Signin";
import Login from "./Pages/Auth/Login";
import Products from "./Pages/Products/Products";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Products />} />
        <Route path={"/signin"} element={<Signin />} />
        <Route path={"/login"} element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
