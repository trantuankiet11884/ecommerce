import React, { useMemo } from "react";
import { generateRange } from "../utils/fn";
import { BiDotsHorizontalRounded } from "react-icons/bi";

const usePagination = (totalProductCount, currentPage, siblingCount = 1) => {
  const paginationArray = useMemo(() => {
    const pageSize = +process.env.REACT_APP_LIMIT || 10;
    const paginationCount = Math.ceil(+totalProductCount / pageSize);
    const totalPaginationItem = siblingCount + 5;

    if (paginationCount <= totalPaginationItem)
      return generateRange(1, paginationCount);

    const isShowLeft = +currentPage - siblingCount > 2;
    const isShowRight = +currentPage + siblingCount < paginationCount - 1;

    if (isShowLeft && !isShowRight) {
      const rightStart = paginationCount - 4;
      const rightRange = generateRange(rightStart, paginationCount);
      return [1, <BiDotsHorizontalRounded />, ...rightRange];
    }

    if (!isShowLeft && isShowRight) {
      const leftRange = generateRange(1, 5);
      return [...leftRange, <BiDotsHorizontalRounded />, paginationCount];
    }

    const siblingLeft = Math.max(+currentPage - siblingCount, 1);
    const sibliingRight = Math.min(
      +currentPage + siblingCount,
      paginationCount
    );

    if (isShowLeft && isShowRight) {
      const middleRange = generateRange(siblingLeft, sibliingRight);
      return [
        1,
        <BiDotsHorizontalRounded />,
        middleRange,
        ,
        <BiDotsHorizontalRounded />,
        paginationCount,
      ];
    }
  }, [totalProductCount, currentPage, siblingCount]);
  return paginationArray;
};

export default usePagination;
