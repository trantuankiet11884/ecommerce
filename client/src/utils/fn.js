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
  number = Math.round(number);
  for (let i = 0; i < +number; i++) {
    stars.push(<AiFillStar color="orange" size={size || 16} />);
  }
  for (let i = 5; i > +number; i--) {
    stars.push(<AiOutlineStar color="orange" size={size || 16} />);
  }
  return stars;
};

export const validate = (form, setInvalidForm) => {
  let invalids = 0;
  const formayForm = Object.entries(form);
  for (let arr of formayForm) {
    if (arr[1].trim() === "") {
      invalids++;
      setInvalidForm((prev) => [
        ...prev,
        { name: arr[0], message: "Required Values Input Field *" },
      ]);
    }
  }

  // for (let arr of formayForm) {
  //   switch (arr[0]) {
  //     case "password":
  //       if (arr[1].length < 6) {
  //         invalids++;
  //         setInvalidForm((prev) => [
  //           ...prev,
  //           { name: arr[0], message: "Password minimun 6 characters" },
  //         ]);
  //       }
  //     default:
  //       break;
  //   }
  // }
  return invalids;
};

export const formatPrice = (number) => Math.round(number / 1000) * 1000;

export const generateRange = (s, e) => {
  const length = e + 1 - s;
  return Array.from({ length }, (_, idx) => s + idx);
};
