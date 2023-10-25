import React from "react";
import { Outlet } from "react-router-dom";
import { Footer, Header, Navbar, TopHeader } from "components";

const Public = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <TopHeader />
      <Header />
      <Navbar />

      <div className="w-main">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Public;
