import React from "react";
import { Switch, Route, Routes, Navigate, Router, Outlet, NavLink} from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import Header from "components/Headers/Header.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Dashboard from "../views/admin/Dashboard.js";
import Maps from "../views/admin/Maps.js";
import Settings from "../views/admin/Settings.js";
import Tables from "../views/admin/Tables";
import Products from "../views/admin/Products.js";
import Profile from "../views/Profile.js";
import Transactions from "views/admin/Transactions.js";
import ChangePassword from "views/admin/ChangePassword.js";
import Login from "views/auth/Login.js";

export default function Admin() {
  return (
    <>
      {/* <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        </nav> */}
      <Sidebar />
      <main>
        <div className="relative md:ml-64 bg-blueGray-100">
          <AdminNavbar />
          {/* <HeaderStats /> */}
          {/* <Header/> */}
          <div className="px-4 md:px-10 mx-auto w-full -m-24 mt-10">
            <Outlet />
            {/* <Routes>
              <Route path="/admin" element={<Dashboard/>}  />
              <Route path="/admin/dashboard" element={<Dashboard/>} />
              <Route path="/admin/maps" element={<Maps/>} />
              <Route path="/admin/settings" element={<Settings/>} />
              <Route path="/admin/tables" element={<Tables/>} />
              <Route path="/admin/classes" element={<Products/>} />
              <Route path="/admin/transactions" element={<Transactions/>} />
              <Route path="/admin/account" element={<Profile/>} />
              <Route path="/admin/change-password" element={<ChangePassword/>} />
              <Redirect from="/admin" to="/admin/dashboard" />
            </Routes> */}
            <FooterAdmin />
          </div>
        </div>
      </main>
    </>
  );
}
