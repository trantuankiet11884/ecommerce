import React from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

const Congratulation = () => {
  const { width, height } = useWindowSize();
  return (
    <div>
      <Confetti width={width} height={height} />
    </div>
  );
};

export default Congratulation;
