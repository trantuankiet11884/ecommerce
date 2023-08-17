import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Navbar, Sidebar, Banner } from "../../components";

const Public = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <Header />
      <Navbar />

      <div className="w-main">
        <Outlet />
      </div>
    </div>
  );
};

export default Public;
