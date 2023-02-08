import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomeTemplate from "./templates/HomeTemplate";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Carts from "./pages/Carts/Carts";
import Detail from "./pages/Detail/Detail";
import Profile from "./pages/Profile/Profile";
import Search from "./pages/Search/Search";
import "./assets/scss/style.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="" element={<HomeTemplate></HomeTemplate>}>
        <Route index element={<Home></Home>}></Route>
        <Route path="login" element={<Login></Login>}></Route>
        <Route path="register" element={<Register></Register>}></Route>
        <Route path="carts" element={<Carts></Carts>}></Route>
        <Route path="detail">
          <Route path=":id"></Route>
        </Route>
        <Route path="profile" element={<Profile></Profile>}></Route>
        <Route path="search" element={<Search></Search>}></Route>
        <Route path="*" element={<Navigate to=""></Navigate>}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
