import React, { memo } from "react";
import path from "../utils/path";
import { Link } from "react-router-dom";
const TopHeader = () => {
  return (
    <div className="h-8 w-full flex justify-center">
      <div className="p-5 w-full flex items-center justify-between text-xs text-white bg-main">
        <span>ORDER ONLINE OR CALL US (+1800) 000 8808</span>
        <Link to={`${path.LOGIN}`}>Sign In or Create Account</Link>
      </div>
    </div>
  );
};

export default memo(TopHeader);
