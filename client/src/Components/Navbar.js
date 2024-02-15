import React from "react";
import { Link } from "react-router-dom";
import { FaRegUser } from "react-icons/fa6";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import { AiFillGift } from "react-icons/ai";

import "../Styles/Navbar.css";
import Signin from "../Pages/Auth/Signin";
import Login from "../Pages/Auth/Login";
function Navbar() {
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
        <Menu>
          <MenuButton as={Button}>
            <FaRegUser />
          </MenuButton>
          <MenuList>
            <Link to={"/login"}>
              <MenuItem>Log In</MenuItem>
            </Link>
            <Link to={"/signin"}>
              <MenuItem>Sign Up</MenuItem>
            </Link>
          </MenuList>
        </Menu>
      </div>
    </nav>
  );
}

export default Navbar;
