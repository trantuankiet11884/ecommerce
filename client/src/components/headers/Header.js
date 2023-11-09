import React, { memo, useEffect, useState } from "react";
import { logo } from "assets/js/index.js";
import icons from "utils/icons.js";
import { Link } from "react-router-dom";
import path from "utils/path.js";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "store/user/userSlice";
import { withNavigate } from "hocs";
import { showCart } from "store/app/appSlice";

const { RiPhoneFill, MdEmail, BsHandbagFill, FaUserCircle } = icons;
const Header = ({ dispatch }) => {
  const { current } = useSelector((state) => state.user);
  const [isShowOption, setisShowOption] = useState(false);

  useEffect(() => {
    const handleClickWeb = (e) => {
      const profile = document.getElementById("profile");
      if (profile && !profile.contains(e.target)) setisShowOption(false);
    };

    document.addEventListener("click", handleClickWeb);
    return () => {
      document.removeEventListener("click", handleClickWeb);
    };
  }, []);

  return (
    <div className="w-main h-[110px] py-[35px] flex justify-between">
      <Link to={`/${path.HOME}`}>
        <img src={logo} alt="logo" className="w-[234px] object-contain" />
      </Link>
      <div className="flex gap-3 text-[13px] ">
        <div className=" px-4 flex flex-col items-center border-r">
          <p className="flex gap-2 items-center">
            <RiPhoneFill color="red" />
            <span className="font-bold">(+84) xxx xxxx xxx</span>
          </p>
          <span>Mon-Sat 8:00AM - 6:00PM</span>
        </div>
        <div className=" px-4 flex flex-col items-center border-r">
          <p className="flex gap-2 items-center">
            <MdEmail color="red" />
            <span className="font-bold">ecommerce@gmail.com</span>
          </p>
          <span>Online 24/7</span>
        </div>
        {current && (
          <>
            <div
              onClick={() => dispatch(showCart({ singal: true }))}
              className="flex px-4 items-center justify-center gap-2 border-r"
            >
              <BsHandbagFill color="red" />
              <span className="text-[12px]">{`${
                current?.cart?.length || 0
              } item `}</span>
            </div>
            <div
              className="cursor-pointer flex px-4 items-center justify-center gap-1 relative"
              onClick={() => setisShowOption((prev) => !prev)}
              id="profile"
            >
              <FaUserCircle size={24} color="red" />
              <span>Profile</span>
              {isShowOption && (
                <div
                  className="absolute top-full left-0 flex flex-col bg-gray-100 border min-w-[150px] py-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Link
                    to={`/${path.MEMBER}/${path.PERSONAL}`}
                    className="w-full p-2 hover:bg-main hover:text-white"
                  >
                    Personal
                  </Link>
                  {+current.role === 1 && (
                    <Link
                      to={`/${path.ADMIN}/${path.DASHBOARD}`}
                      className="w-full p-2 hover:bg-main hover:text-white"
                    >
                      Admin Workspace
                    </Link>
                  )}
                  <span
                    className="w-full p-2 hover:bg-main hover:text-white"
                    onClick={() => dispatch(logout())}
                  >
                    Logout
                  </span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default withNavigate(memo(Header));
