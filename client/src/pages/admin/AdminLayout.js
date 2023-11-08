import React from "react";

import { AdminSidebar } from "components";
import { Outlet } from "react-router-dom";
const AdminLayout = () => {
  // bg-gray-100  relative text-gray-900
  // top-0 bottom-0 fixed
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <div className=" flex-none  ">
        <AdminSidebar />
        <div className="w-[250px]"></div>
      </div>
      <div className="flex-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
