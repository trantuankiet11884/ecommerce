import React, { memo, useEffect, useRef, useState } from "react";
import { logo } from "assets/js";
import { voteOptions } from "utils/constant";
import { AiFillStar } from "react-icons/ai";
import { Button } from "components";
const VoteOption = ({ nameProduct, handleSubmitVote }) => {
  const modalRef = useRef();
  const [chosenScore, setChosenScore] = useState(null);
  const [comment, setComment] = useState("");
  const [score, setScore] = useState("");

  useEffect(() => {
    modalRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
  }, []);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-white w-[700px] h-[500px] p-4 flex flex-col gap-4 items-center justify-center"
      ref={modalRef}
    >
      <img src={logo} alt="logo" className="w-[300px] object-contain my-8" />
      <div className="flex flex-col w-full">
        <h2 className="text-center text-medium text-lg">{`Voting the product ${nameProduct}`}</h2>
        <textarea
          className="form-textarea w-full"
          placeholder="Type something..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>
      <div className="w-full flex flex-col gap-4">
        <p>How do you like this product ?</p>
        <div className="flex items-center justify-center gap-4">
          {voteOptions.map((item) => (
            <div
              key={item.id}
              className="w-[100px] h-[100px] flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-300 cursor-pointer justify-center flex-col gap-2"
              onClick={() => {
                setChosenScore(item.id);
                setScore(item.id);
              }}
            >
              {Number(chosenScore) && chosenScore >= item.id ? (
                <AiFillStar color="orange" />
              ) : (
                <AiFillStar color="gray" />
              )}
              <span className="text-sm">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
      <Button fw onOk={() => handleSubmitVote({ comment, score })}>
        Submit
      </Button>
    </div>
  );
};

export default memo(VoteOption);
