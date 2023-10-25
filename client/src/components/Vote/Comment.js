import React from "react";
import moment from "moment";
import { renderStar } from "utils/fn";
const Comment = ({ image, name, comment, star }) => {
  console.log(name);
  return (
    <div className="flex gap-4">
      <div className="flex-none">
        <img
          src="https://zpsocial-f42-org.zadn.vn/eb9318d19a1c76422f0d.jpg"
          alt="avatar"
          className="w-[30px] h-[30px] object-cover rounded-full"
        />
      </div>
      <div className="flex flex-col flex-auto ">
        <div className="flex justify-between">
          <h3 className="font-semibold">{name}</h3>
          <span>{moment(comment?.updatedAt)?.fromNow()}</span>
        </div>
        <div className="flex flex-col gap-2 pl-4 text-sm mt-4 py-2 bg-gray-100 border-gray-300">
          <span className="flex items-center gap-1">
            <span className="font-semibold ">Rating: </span>
            <span className="flex items-center gap-1">
              {renderStar(star)?.map((star, idx) => (
                <span key={idx}>{star}</span>
              ))}
            </span>
          </span>
          <span className="flex gap-1">
            <span className="font-semibold ">Comment: </span>
            <span className="flex items-center gap-1">{comment}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
