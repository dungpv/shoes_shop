import React from "react";
import { NavLink } from "react-router-dom";
type Props = {};

export default function Header(props: Props) {
  return (
    <div className="header">
      <section className="logo-header">
        <div className="logo">
          <NavLink className={"logo-link"} to="">
            <img src="./img/logo.png" alt="logo"></img>
          </NavLink>
        </div>
        <div className="nav-bar-search">
          <div className="search flex-item">
            <NavLink className={"search-link"} to={"/search"}>
              <i className="fa fa-search"></i> Search
            </NavLink>
          </div>
          <div className="carts flex-item">
            <NavLink className={"carts-link"} to={"/carts"}>
              <i className="fa fa-cart-plus"></i> (1)
            </NavLink>
          </div>
          <div className="login flex-item">
            <NavLink className={"carts-link"} to={"/login"}>
              Login
            </NavLink>
          </div>
          <div className="register flex-item">
            <NavLink className={"carts-link"} to={"/register"}>
              Register
            </NavLink>
          </div>
        </div>
      </section>
      <section className="menu d-flex align-items-center">
        <nav className="nav-menu">
          <NavLink className="mx-2" to="">
            Home
          </NavLink>
          <NavLink className="mx-2" to="">
            Men
          </NavLink>
          <NavLink className="mx-2" to="">
            Woman
          </NavLink>
          <NavLink className="mx-2" to="">
            Kid
          </NavLink>
          <NavLink className="mx-2" to="">
            Sport
          </NavLink>
        </nav>
      </section>
    </div>
  );
}
