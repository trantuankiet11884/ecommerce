import React, { memo, useEffect, useRef } from "react";
import { AiFillStar } from "react-icons/ai";
const VoteBar = ({ number, ratingCount, ratingTotal }) => {
  const percentRef = useRef();
  useEffect(() => {
    const percent = Math.round((ratingCount * 100) / ratingTotal) || 0;
    percentRef.current.style.cssText = `right: ${100 - percent}%`;
  }, [ratingCount, ratingTotal]);
  return (
    <div className="flex items-center gap-1 text-sm text-gray-500">
      <div className="flex w-[15%] items-center gap-1 text-sm">
        <span>{number}</span>
        <AiFillStar color="orange" />
      </div>
      <div className="w-[70%]">
        <div className="w-full h-2 relative bg-gray-300 rounded-full">
          <div
            className="absolute inset-0 bg-red-500 rounded-full"
            ref={percentRef}
          ></div>
        </div>
      </div>
      <div className="w-[15%] flex justify-end">{`${
        ratingCount || 0
      } reviewers`}</div>
    </div>
  );
};

export default memo(VoteBar);
