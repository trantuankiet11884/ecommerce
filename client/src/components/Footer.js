import React, { memo } from "react";
import icons from "../utils/icons";

const { MdEmail } = icons;
const Footer = () => {
  return (
    <div className="w-full">
      <div className="h-[103px] bg-main w-full flex items-center justify-center">
        <div className="w-main flex items-center justify-between">
          <div className="flex flex-col flex-1">
            <span className="text-[20px] text-gray-200">
              SIGN UP TO NEWSLETTER{" "}
            </span>
            <small className="text-[13px] text-gray-700">
              Subscribe now and receive weekly newsletter
            </small>
          </div>
          <div className="flex-1 flex items-center">
            <input
              type="text"
              className="text-gray-100 w-full p-4 pr-0 rounded-l-full bg-[#f04646] outline-none placeholder:text-xs placeholder:text-gray-100 placeholder:opacity-50"
              placeholder="Email address"
            />
            <div className="h-[56px] w-[56px] bg-[#f04646] rounded-r-full flex items-center justify-center text-white">
              <MdEmail size={16} />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[407px] bg-black w-full flex items-center justify-center">
        <div className="w-main">Copyright</div>
      </div>
    </div>
  );
};

export default memo(Footer);
