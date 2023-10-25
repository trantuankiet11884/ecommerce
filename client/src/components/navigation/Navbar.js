import React from "react";
import { navigation } from "utils/constant.js";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-main h-[48px] py-2 mb-4 text-sm flex">
      {navigation.map((item) => (
        <NavLink
          to={item.path}
          key={item.id}
          className={({ isActive }) => {
            return isActive
              ? "pr-12 hover:text-main text-main"
              : "pr-12 hover:text-main active:";
          }}
        >
          {item.value}
        </NavLink>
      ))}
    </div>
  );
};

export default Navbar;
