import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { createSlug } from "../utils/fn.js";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../store/asyncAction";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.appReducer);
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  return (
    <div className="flex flex-col border">
      {categories &&
        categories.map((item) => (
          <NavLink
            to={createSlug(item.title)}
            key={createSlug(item.title)}
            className={({ isActive }) =>
              isActive
                ? "bg-main text-white px-4 py-4 text-sm hover:text-main"
                : "px-4 py-4 text-sm hover:text-main"
            }
          >
            {item.title}
          </NavLink>
        ))}
    </div>
  );
};

export default Sidebar;
