import React from "react";
import { logo } from "../assets/js/index.js";
import icons from "../utils/icons.js";
import { Link } from "react-router-dom";
import path from "../utils/path.js";

const Header = () => {
  const { RiPhoneFill, MdEmail, BsHandbagFill, FaUserCircle } = icons;
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
        <div className="flex px-4 items-center justify-center gap-2 border-r">
          <BsHandbagFill color="red" />{" "}
          <span className="text-[12px]">0 item</span>
        </div>
        <div className="flex px-4 items-center justify-center">
          <FaUserCircle size={24} color="red" />
        </div>
      </div>
    </div>
  );
};

export default Header;
