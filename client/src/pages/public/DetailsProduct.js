import React from "react";
import { useParams } from "react-router-dom";
const DetailsProduct = () => {
  const { pid, title } = useParams();
  console.log(pid, title);
  return <div>DetailsProduct</div>;
};

export default DetailsProduct;
