import icons from "./icons";
const { AiFillStar, AiOutlineStar } = icons;

export const createSlug = (string) => {
  return string
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("-");
};

export const formatMoney = (number) => {
  if (typeof number !== "number") {
    return ""; // or some default value or an error message
  }
  return Number(number.toFixed(1)).toLocaleString();
};

export const renderStar = (number, size) => {
  if (!Number(number)) return;
  const stars = [];
  for (let i = 0; i < +number; i++) {
    stars.push(<AiFillStar color="orange" size={size || 16} />);
  }
  for (let i = 5; i > +number; i--) {
    stars.push(<AiOutlineStar color="orange" size={size || 16} />);
  }
  return stars;
};
