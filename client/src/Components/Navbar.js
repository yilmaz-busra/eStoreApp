import React from "react";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa6";
import { FaShoppingBasket } from "react-icons/fa";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { AiFillGift } from "react-icons/ai";

import "../Styles/Navbar.css";
import { useAuth } from "../context/AuthContext";
import { useBasket } from "../context/BasketContext";
function Navbar() {
  const { loggedIn, logout } = useAuth();
  const { items } = useBasket();

  const handleLogout = async () => {
    logout();
  };

  return (
    <nav>
      <div className="left">
        <Link className="logo" to={"/"}>
          <AiFillGift fontSize={50} /> <h1>BY</h1>
        </Link>
      </div>
      <ul className="menu">
        <li>
          <Link to={"/"}>Products</Link>
        </li>
        <li>
          <Link to={"/"}>Products</Link>
        </li>
        <li>
          <Link to={"/"}>Products</Link>
        </li>
      </ul>
      <div className="right">
        <Button colorScheme="teal" variant="outline">
          <FaShoppingBasket /> {items.length}
        </Button>

        <Menu>
          <MenuButton as={Button}>
            <FaRegUser />
          </MenuButton>
          <MenuList>
            {!loggedIn ? (
              <>
                <Link to={"/login"}>
                  <MenuItem>Log In</MenuItem>
                </Link>
                <Link to={"/signup"}>
                  <MenuItem>Sign Up</MenuItem>
                </Link>
              </>
            ) : (
              <>
                <Link to={"/profile"}>
                  <MenuItem>Profile</MenuItem>
                </Link>
                <Link onClick={handleLogout} to={"/"}>
                  <MenuItem>Log out</MenuItem>
                </Link>
              </>
            )}
          </MenuList>
        </Menu>
      </div>
    </nav>
  );
}

export default Navbar;
