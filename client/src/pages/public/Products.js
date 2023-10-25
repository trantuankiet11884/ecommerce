import React, { useCallback, useEffect, useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  Breadcrumb,
  FilterProduct,
  Pagination,
  Product,
  Selected,
} from "components";
import { apiGetProducts } from "apis";
import Masonry from "react-masonry-css";
import { sortBy } from "utils/constant";
const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

const Products = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [products, setProducts] = useState(null);
  const [activeClick, seActiveClick] = useState(null);
  const [sort, setSort] = useState("");
  const [params] = useSearchParams();

  const fetchProductsByCategory = async (queries) => {
    const response = await apiGetProducts(queries);
    if (response.success) setProducts(response);
  };

  const clickFilter = useCallback(
    (name) => {
      if (activeClick === name) seActiveClick(null);
      else seActiveClick(name);
    },
    [activeClick]
  );

  useEffect(() => {
    let param = [];
    for (let i of params.entries()) param.push(i);
    const queries = {};
    for (let i of params) queries[i[0]] = i[1];
    let priceQuery = {};
    if (queries.to && queries.from) {
      priceQuery = {
        $and: [
          { price: { gte: queries.from } },
          { price: { lte: queries.to } },
        ],
      };
      delete queries.price;
    } else {
      if (queries.from) queries.price = { gte: queries.from };
      if (queries.to) queries.price = { lte: queries.to };
    }
    delete queries.from;
    delete queries.to;
    const q = { ...priceQuery, ...queries };
    fetchProductsByCategory(q);
    window.scrollTo(0, 0);
  }, [params]);

  const changeValue = useCallback(
    (value) => {
      setSort(value);
    },
    [sort]
  );

  useEffect(() => {
    if (sort) {
      navigate({
        pathname: `/${category}`,
        search: createSearchParams({ sort }).toString(),
      });
    }
  }, [sort]);

  return (
    <div className="w-full">
      <div className="w-main">
        <h3 className="font-bold uppercase">{category}</h3>
        <Breadcrumb category={category} />
      </div>

      <div className="w-main border p-4 flex justify-between m-auto">
        <div className="flex flex-col gap-2">
          <span className="font-semibold">Filter by :</span>
          <div className="w-4/5 flex-auto flex gap-4 ">
            <FilterProduct
              name="Price"
              activeClick={activeClick}
              clickFilter={clickFilter}
              type="input"
            />
            <FilterProduct
              name="Color"
              activeClick={activeClick}
              clickFilter={clickFilter}
            />
          </div>
        </div>
        <div className="w-1/5 flex flex-col gap-4">
          <span className="font-semibold text-sm">Sort by</span>
          <div className="w-full">
            <Selected value={sort} options={sortBy} changeValue={changeValue} />
          </div>
        </div>
      </div>
      <div className="w-main mt-8 m-auto">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid flex gap-4"
          columnClassName="my-masonry-grid_column"
        >
          {products?.products?.map((product) => (
            <div className="border" key={product.id}>
              <Product pid={product.id} productsData={product} normal={true} />
            </div>
          ))}
        </Masonry>
      </div>
      <div className="w-main flex justify-center">
        <Pagination totalCount={products?.counts} />
      </div>
      <div className="w-full h-[500px]"></div>
    </div>
  );
};

export default Products;
