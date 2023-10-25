import React, { memo } from "react";

const CountDown = ({ unit, number }) => {
  return (
    <div className="w-[70px] h-12 bg-[#f4f4f4] rounded-md text-center flex flex-col  justify-center">
      <span className="text-lg text-gray-800">{number}</span>
      <span className="text-xs text-gray-700">{unit}</span>
    </div>
  );
};

export default memo(CountDown);
