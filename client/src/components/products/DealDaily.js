import React, { memo, useEffect, useState } from "react";
import icons from "utils/icons";
import { apiGetProducts } from "apis/product";
import { formatMoney, renderStar } from "utils/fn";
import { CountDown } from "components";
import { DateTime } from "luxon";

const { AiFillStar, AiOutlineMenu } = icons;

const DealDaily = () => {
  const [dealdaily, setDealdaily] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);

  const fetchDealDaily = async () => {
    const response = await apiGetProducts({
      limit: 1,
      page: Math.round(Math.random() * 10),
    });
    if (response.success) {
      setDealdaily(response.products[0]);

      const now = DateTime.now().setZone("Asia/Ho_Chi_Minh");
      const endOfDay = now.endOf("day");
      const remainingMilliseconds = endOfDay.diff(now).as("milliseconds");
      setTimeRemaining(remainingMilliseconds);
    }
  };

  useEffect(() => {
    fetchDealDaily();
  }, []);

  useEffect(() => {
    if (timeRemaining <= 0) {
      fetchDealDaily();
      return;
    }

    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1000);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timeRemaining]);
  return (
    <div className="w-full flex-auto">
      <div className="flex items-center justify-between">
        <span className="flex-1 flex justify-center pl-4">
          <AiFillStar color="#dd1111" size={20} />
        </span>
        <span className="flex-4 uppercase font-bold text-lg flex justify-center">
          daily deals
        </span>
        <span className="flex-1"></span>
      </div>
      <div className="w-full flex flex-col items-center mt-1 px-4 gap-2">
        <img
          src={dealdaily?.thumbnail || ""}
          alt="product"
          className="w-[200px] h-[200px] object-cover"
        />
        <span
          className="line-clamp-1 text-center"
          key={`title_${dealdaily?.id}`}
        >
          {dealdaily?.title}
        </span>
        <span className="flex h-4" key={`rating_${dealdaily?.id}`}>
          {renderStar(dealdaily?.totalRatings, 20)?.map((el, idx) => (
            <span key={idx}>{el}</span>
          ))}
        </span>
        <span key={`price_${dealdaily?.id}`}>{`${formatMoney(
          dealdaily?.price
        )} VNĐ`}</span>
      </div>

      <div className="px-4 mt-1">
        <div className="flex justify-between items-center mb-4">
          <CountDown
            unit={"Hours"}
            number={Math.floor(timeRemaining / (60 * 60 * 1000))}
          />
          <CountDown
            unit={"Minutes"}
            number={Math.floor(
              (timeRemaining % (60 * 60 * 1000)) / (60 * 1000)
            )}
          />
          <CountDown
            unit={"Seconds"}
            number={Math.floor((timeRemaining % (60 * 1000)) / 1000)}
          />
        </div>
        <button
          type="button"
          className="flex gap-2 items-center justify-center w-full bg-main hover:bg-gray-800 text-white font-medium py-1"
        >
          <AiOutlineMenu />
          <span>Options</span>
        </button>
      </div>
    </div>
  );
};

export default memo(DealDaily);
