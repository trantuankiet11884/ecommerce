import React, { memo } from "react";
import { banner } from "assets/js";

const Banner = () => {
  return (
    <div className="w-full">
      <img src={banner} alt="" className="h-[314px] w-full object-cover" />
    </div>
  );
};

export default memo(Banner);
