import { MemberSidebar } from "components";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import path from "utils/path";

const MemberLayout = () => {
  // const { isLoggedIn, current } = useSelector((state) => state.user);
  // if (!isLoggedIn || !current) return <Navigate to={`/${path.LOGIN}`} />;
  return (
    <div className="w-full flex">
      <MemberSidebar />
      <div className="flex-auto bg-gray-100 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default MemberLayout;
