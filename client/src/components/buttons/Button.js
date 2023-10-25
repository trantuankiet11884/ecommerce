import React, { memo } from "react";

const Button = ({ children, onOk, style, startIcon, endIcon }) => {
  return (
    <button
      type="button"
      className={
        style ? style : "px-5 py-2 rounded-md text-white bg-main font-semibold"
      }
      onClick={() => {
        onOk && onOk();
      }}
    >
      {children}
    </button>
  );
};

export default memo(Button);
