import React, { Fragment, memo, useState } from "react";
import { logo } from "assets/js";
import { Link, NavLink } from "react-router-dom";
import { adminNavLink } from "utils/constant";
import clsx from "clsx";
import { AiOutlineCaretDown, AiOutlineCaretRight } from "react-icons/ai";

const activedStyle = "px-4 py-2 flex items-center gap-2 bg-gray-500";
const notActiveStlye = "px-4 py-2 flex items-center gap-2 hover:bg-gray-400";

const AdminSidebar = () => {
  const [actived, setActived] = useState([]);

  const handleDropDown = (id) => {
    if (actived.some((item) => item === id)) {
      setActived((prev) => prev.filter((el) => el != id));
    } else {
      setActived((prev) => [...prev, id]);
    }
  };
  return (
    <div className=" bg-white h-full py-4 font-semibold ">
      <Link to={`/`} className="flex flex-col items-center gap-2 p-4">
        <img src={logo} alt="logo" className="w-[200px] object-contain" />
        <small>Admin WorkSpaces</small>
      </Link>
      <div>
        {adminNavLink.map((nav) => (
          <Fragment key={nav.id}>
            {nav.type === "SINGLE" && (
              <NavLink
                to={nav.path}
                className={({ isActive }) =>
                  clsx(isActive && activedStyle, !isActive && notActiveStlye)
                }
              >
                <span>{nav.icon}</span>
                <span>{nav.text}</span>
              </NavLink>
            )}
            {nav.type === "PARENT" && (
              <div
                className="flex flex-col"
                onClick={() => handleDropDown(+nav.id)}
              >
                <div className="cursor-pointer flex items-center justify-between gap-2 px-4 py-2 hover:bg-gray-600">
                  <div className="flex items-center gap-2">
                    <span>{nav.icon}</span>
                    <span>{nav.text}</span>
                  </div>
                  {actived.some((id) => id === +nav.id) ? (
                    <AiOutlineCaretRight />
                  ) : (
                    <AiOutlineCaretDown />
                  )}
                </div>
                {actived.some((id) => +id === +nav.id) && (
                  <div className="w-full">
                    <div className="flex flex-col mx-8">
                      {nav.subMenu.map((subNav, idx) => (
                        <NavLink
                          key={idx}
                          to={subNav.path}
                          className={({ isActive }) =>
                            clsx(
                              isActive && activedStyle,
                              !isActive && notActiveStlye
                            )
                          }
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>{subNav.text}</span>
                        </NavLink>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default memo(AdminSidebar);
