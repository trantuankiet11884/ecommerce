import React, { memo, useEffect, useState } from "react";
import icons from "utils/icons";
import { colors } from "utils/constant";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { apiGetProducts } from "apis";
import useDebounce from "hooks/useDebounce";
import { toast } from "react-toastify";
const { AiOutlineDown } = icons;
const FilterProduct = ({
  name,
  activeClick,
  clickFilter,
  type = "checkbox",
}) => {
  const [selected, setSelected] = useState([]);
  const [price, setPrice] = useState({
    from: "",
    to: "",
  });
  const [bestPrice, setBestPrice] = useState(null);
  const { category } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const handleSelected = (e) => {
    const already = selected.find((item) => item === e.target.value);
    if (already)
      setSelected((prev) => prev.filter((el) => el !== e.target.value));
    else setSelected((prev) => [...prev, e.target.value]);
    clickFilter(null);
  };

  const resetSelected = () => {
    setSelected([]);
  };

  const resetPrice = () => {
    setPrice({
      from: "",
      to: "",
    });
  };

  const debouncePriceFrom = useDebounce(price.from, 500);
  const debouncePriceTo = useDebounce(price.to, 500);
  useEffect(() => {
    let param = [];
    for (let i of params.entries()) param.push(i);
    const queries = {};
    for (let i of param) queries[i[0]] = i[1];

    if (selected.length > 0) {
      queries.color = selected.join(",");
      queries.page = 1;
    } else delete queries.color;

    navigate({
      pathname: `/${category}`,
      search: createSearchParams(queries).toString(),
    });
  }, [selected]);

  const fetchPriceProductHightest = async () => {
    const res = await apiGetProducts({ sort: "-price", limit: 1 });
    if (res.success) setBestPrice(res.products[0]?.price);
  };
  useEffect(() => {
    if (type === "input") fetchPriceProductHightest();
  }, [type]);

  useEffect(() => {
    if (price.from && price.to && price.from > price.to)
      toast("From is letter than To !!!");
  }, [price]);

  useEffect(() => {
    let param = [];
    for (let i of params.entries()) param.push(i);
    const queries = {};
    for (let i of param) queries[i[0]] = i[1];

    if (Number(price.from) > 0) queries.from = price.from;
    else delete queries.from;
    if (Number(price.to) > 0) queries.to = price.to;
    else delete queries.to;
    queries.page = 1;
    navigate({
      pathname: `/${category}`,
      search: createSearchParams(queries).toString(),
    });
  }, [debouncePriceFrom, debouncePriceTo]);

  return (
    <div
      onClick={() => clickFilter(name)}
      className="relative cursor-pointer p-3 gap-4 border border-gray-800 flex justify-between items-center"
    >
      <span className="text-xs">{name}</span>
      <AiOutlineDown />
      {activeClick === name && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-full left-0 w-fit p-4 z-50 border min-w-[150px] bg-white"
        >
          {type === "checkbox" && (
            <div className="p-2 ">
              <div className="p-4 flex items-center justify-between gap-8">
                <span className="whitespace-nowrap text-xs text-gray-500">{`${selected.length} selected`}</span>
                <span
                  className="underline hover:text-main"
                  onClick={resetSelected}
                >
                  Reset
                </span>
              </div>
              <hr className="mb-4" />
              <div onClick={(e) => e.stopPropagation()}>
                {colors.map((color, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      name={color}
                      className="rounded outline-none"
                      onChange={handleSelected}
                      value={color}
                      checked={selected.some(
                        (seletedItem) => seletedItem === color
                      )}
                    />
                    <label htmlFor={color} className="capitalize text-gray-700">
                      {color}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          {type === "input" && (
            <div>
              <div className="p-4 flex items-center justify-between gap-8">
                <span className="whitespace-nowrap text-xs text-gray-500">{`The hightest price is ${Number(
                  bestPrice
                ).toLocaleString()} VND`}</span>
                <span
                  className="underline hover:text-main"
                  onClick={resetPrice}
                >
                  Reset
                </span>
              </div>
              <div className="flex items-center p-2 gap-2">
                <div className="flex items-center gap-2">
                  <label htmlFor="from">From</label>
                  <input
                    type="number"
                    id="from"
                    className="form-input"
                    onChange={(e) =>
                      setPrice((prev) => ({ ...prev, from: e.target.value }))
                    }
                    value={price.from}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="to">To</label>
                  <input
                    type="number"
                    id="to"
                    className="form-input"
                    onChange={(e) =>
                      setPrice((prev) => ({ ...prev, to: e.target.value }))
                    }
                    value={price.to}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default memo(FilterProduct);
