import React, { memo } from "react";

const ProductExtraInfoItem = ({ title, sub, icon }) => {
  return (
    <div className=" flex items-center p-3 gap-4 mb-1 border">
      <span className="p-2 bg-gray-800 rounded-full items-center text-white justify-center">
        {icon}
      </span>
      <div className="flex flex-col text-sm text-gray-500">
        <span>{title}</span>
        <span className="text-xs">{sub}</span>
      </div>
    </div>
  );
};

export default memo(ProductExtraInfoItem);
