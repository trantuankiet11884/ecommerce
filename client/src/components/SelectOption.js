import React from "react";

const SelectOption = ({ icon }) => {
  return (
    <div className="hover:bg-gray-800 hover:text-white border-none outline-none cursor-pointer w-10 h-10 flex items-center justify-center bg-white rounded-full border shadow-md">
      {icon}
    </div>
  );
};

export default SelectOption;
