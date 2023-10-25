import React, { memo, useState } from "react";
import { tabs } from "utils/constant";
import { VoteBar } from "components";
import { Button } from "components";
import { renderStar } from "utils/fn";
import { apiRatings } from "apis/product";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "store/app/appSlice";
import { VoteOption } from "components";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import path from "utils/path";
import { Comment } from "components";

const activeStyle = "";
const notActiveStyle = "";

const ProductInfomation = ({
  totalRatings,
  totalCount,
  nameProduct,
  pid,
  ratings,
  updateCS,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);
  const { isLoggedIn } = useSelector((state) => state.user);
  const handleSubmitVote = async ({ comment, score }) => {
    if (!comment || !score || !pid) {
      toast.error("Vote when click submit, plsss");
      return;
    }
    await apiRatings({
      star: score,
      comment: comment,
      pid,
      updatedAt: Date.now(),
    });
    updateCS();
    dispatch(showModal({ isShowModal: false, modalChildren: null }));
  };

  const handleVoteNow = () => {
    if (!isLoggedIn) {
      Swal.fire({
        text: "Login to vote",
        cancelButtonText: "Cancel",
        confirmButtonText: "Go login",
        title: "Oops !!!",
        showCancelButton: true,
      }).then((rs) => {
        if (rs.isConfirmed) navigate(`/${path.LOGIN}`);
      });
    } else {
      dispatch(
        showModal({
          isShowModal: true,
          modalChildren: (
            <VoteOption
              nameProduct={nameProduct}
              handleSubmitVote={handleSubmitVote}
            />
          ),
        })
      );
    }
  };

  return (
    <div className="relative">
      <div className="flex gap-2 items-center relative bottom-[-1px]">
        {tabs.map((item) => (
          <span
            key={item.id}
            className={`py-2  px-4 cursor-pointer ${
              activeTab === +item.id
                ? "bg-white border border-b-0"
                : "bg-gray-200"
            }`}
            onClick={() => setActiveTab(item.id)}
          >
            {item.name}
          </span>
        ))}
        <div
          className={`py-2  px-4 cursor-pointer ${
            activeTab === 5 ? "bg-white border border-b-0" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab(5)}
        >
          Customer
        </div>
      </div>
      <div className="w-full border p-2">
        {tabs.some((item) => item.id === activeTab) &&
          tabs[activeTab - 1]?.content}
        {activeTab === 5 && (
          <div className="flex p-4 ">
            <div className="flex-4 flex items-center justify-center flex-col">
              <span className="text-sm font-semibold">{`${totalRatings}/5 stars`}</span>
              <span className="flex ">
                {renderStar(totalRatings)?.map((star, idx) => (
                  <span key={idx}>{star}</span>
                ))}
              </span>
              <span>{`${ratings?.length} reviewers`}</span>
            </div>
            <div className="flex-6 flex flex-col p-4">
              {Array.from(Array(5).keys())
                .reverse()
                .map((rating) => (
                  <VoteBar
                    key={rating}
                    number={rating + 1}
                    ratingTotal={ratings?.length}
                    ratingCount={
                      ratings?.filter((el) => el.star === rating + 1)?.length
                    }
                  />
                ))}
            </div>
          </div>
        )}
        {activeTab === 5 && (
          <div>
            <div className="p-4 flex flex-col items-center justify-center text-sm">
              <span className="font-semibold">
                Do you review this product ?
              </span>
              <Button onOk={handleVoteNow}>Rate now !!!</Button>
            </div>
            <div className="flex flex-col gap-4">
              {ratings?.map((el) => (
                <Comment
                  key={el.id}
                  star={el.star}
                  updatedAt={el.updatedAt}
                  comment={el.comment}
                  name={`${el.postedBy?.firstName} ${el.postedBy?.lastName}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(ProductInfomation);
