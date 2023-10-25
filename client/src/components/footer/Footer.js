import React, { memo } from "react";
import icons from "utils/icons";

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
      <div className="h-[407px] text-xs text-white bg-black w-full flex items-center justify-center">
        <div className="w-main flex ">
          <div className="flex-2 flex flex-col gap-2">
            <h3 className="mb-[20px] border-l-2 border-main pl-[15px] text-[15px] font-medium uppercase">
              About us
            </h3>
            <p>
              <span>Address:</span>&nbsp;
              <span className="opacity-50">
                474 Ontario St Toronto, ON M4X 1M7 Canada
              </span>
            </p>
            <p>
              <span>Phone:</span>&nbsp;
              <span className="opacity-50">(+1234)56789xxx</span>
            </p>
            <p>
              <span>Mail:</span>&nbsp;
              <span className="opacity-50">tadathemes@gmail.com</span>
            </p>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="mb-[20px] border-l-2 border-main pl-[15px] text-[15px] font-medium uppercase">
              INFORMATION
            </h3>
            <span className="opacity-50">Typography </span>
            <span className="opacity-50"> Gallery </span>
            <span className="opacity-50"> Store </span>
            <span className="opacity-50"> Location </span>
            <span className="opacity-50"> Today's </span>
            <span className="opacity-50"> Deals </span>
            <span className="opacity-50"> Contact</span>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="mb-[20px] border-l-2 border-main pl-[15px] text-[15px] font-medium uppercase">
              WHO WE ARE
            </h3>
            <span className="opacity-50">Help </span>
            <span className="opacity-50"> Free Shipping </span>
            <span className="opacity-50"> FAQs </span>
            <span className="opacity-50"> Return & Exchange </span>
            <span className="opacity-50"> Testimonials's </span>
          </div>
          <div className="flex-1 ">
            <h3 className="mb-[20px] border-l-2 border-main pl-[15px] text-[15px] font-medium uppercase">
              #DIGITALWORLDSTORE
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Footer);
