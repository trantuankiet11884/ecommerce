import React, { Fragment, memo, useState } from "react";
import { avatarJoke } from "assets/js";
import { Link, NavLink } from "react-router-dom";
import { memberNavLink } from "utils/constant";
import clsx from "clsx";
import { AiOutlineCaretDown, AiOutlineCaretRight } from "react-icons/ai";
import { useSelector } from "react-redux";

const activedStyle = "px-4 py-2 flex items-center gap-2 bg-gray-500";
const notActiveStlye = "px-4 py-2 flex items-center gap-2 hover:bg-gray-400";

const MemberSidebar = () => {
  const [actived, setActived] = useState([]);
  const { current } = useSelector((state) => state.user);
  const handleDropDown = (id) => {
    if (actived.some((item) => item === id)) {
      setActived((prev) => prev.filter((el) => el != id));
    } else {
      setActived((prev) => [...prev, id]);
    }
  };
  return (
    <div className=" bg-white h-full py-4 font-semibold w-[250px] flex-none">
      <div className="w-full flex flex-col gap-1 items-center justify-center py-4">
        <img
          src={current?.avatar || avatarJoke}
          alt="logo"
          className="w-16 h-16 object-cover rounded-full"
        />
        <small>{`${current?.firstName} ${current?.lastName}`}</small>
      </div>
      <div>
        {memberNavLink.map((nav) => (
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

export default memo(MemberSidebar);
