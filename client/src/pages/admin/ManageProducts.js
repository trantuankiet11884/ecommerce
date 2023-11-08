import React, { useCallback, useEffect, useState } from "react";
import { apiDeleteProduct, apiGetProducts } from "apis";
import { CustomizeVarriants, InputForm, Pagination } from "components";
import { useForm } from "react-hook-form";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import useDebounce from "hooks/useDebounce";
import UpdateProduct from "./UpdateProduct";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const ManageProducts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    formState: { errors },
    watch,
  } = useForm();
  const [params] = useSearchParams();
  const [products, setProducts] = useState(null);
  const [counts, setCounts] = useState(0);
  const [editProduct, setEditProduct] = useState(null);
  const [customizeVarriants, setCustomizeVarriants] = useState(null);
  const [update, setUpdate] = useState(false);

  const fetchProducts = async (params) => {
    const response = await apiGetProducts({
      ...params,
      limit: process.env.REACT_APP_LIMIT,
    });
    if (response.success) {
      setCounts(response.counts);
      setProducts(response.products);
    }
  };

  const queryDebounce = useDebounce(watch("q"), 800);

  const handleDeleteProduct = async (pid) => {
    Swal.fire({
      title: "Are you sure ?",
      text: "Are you sure delete this product ???",
      icon: "warning",
      showCancelButton: true,
    }).then(async (rs) => {
      if (rs.isConfirmed) {
        const response = await apiDeleteProduct(pid);
        if (response.success) toast.success(response.message);
        else toast.error(toast.message);
        render();
      }
    });
  };

  useEffect(() => {
    if (queryDebounce) {
      navigate({
        pathname: location.pathname,
        search: createSearchParams({ q: queryDebounce }).toString(),
      });
    } else navigate({ pathname: location.pathname });
  }, [queryDebounce]);

  useEffect(() => {
    const searchParams = Object.fromEntries([...params]);
    fetchProducts(searchParams);
  }, [params, update]);

  const render = useCallback(() => {
    setUpdate(!update);
  }, []);

  return (
    <div className="w-full flex flex-col p-4 relative">
      {editProduct && (
        <div className="absolute inset-0 min-h-screen bg-gray-100 z-50">
          <UpdateProduct
            setEditProduct={setEditProduct}
            editProduct={editProduct}
            render={render}
          />
        </div>
      )}

      {customizeVarriants && (
        <div className="absolute inset-0 min-h-screen bg-gray-100 z-50">
          <CustomizeVarriants
            customizeVarriants={customizeVarriants}
            render={render}
            setCustomizeVarriants={setCustomizeVarriants}
          />
        </div>
      )}

      <div className="w-full flex justify-between items-center">
        <h1 className="h-20 flex justify-between items-center text-3xl font-semibold">
          <span>Manage Products</span>
        </h1>
      </div>
      <div className="flex w-full justify-end items-center px-4">
        <form className="w-[45%]">
          <InputForm
            id="q"
            register={register}
            errors={errors}
            fullWidth
            placeholder="Search products by title..."
          />
        </form>
      </div>
      <table className="table-fixed border">
        <thead>
          <tr className="border">
            <th className="border">STT</th>
            <th className="border">Title</th>
            <th className="border">Brand</th>
            <th className="border">Category</th>
            <th className="border">Price</th>
            <th className="border">Quantity</th>
            <th className="border">Sold</th>
            <th className="border">Color</th>
            <th className="border">Thumbnail</th>
            <th className="border">Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {products?.map((product, idx) => (
            <tr key={product._id} className="text-center border">
              <td className="border py-1">
                {(+params.get("page") > 1 ? +params.get("page") - 1 : 0) *
                  process.env.REACT_APP_LIMIT +
                  idx +
                  1}
              </td>
              <td className="border py-1">{product.title}</td>
              <td className="border py-1">{product.brand}</td>
              <td className="border py-1">{product.category}</td>
              <td className="border py-1">{product.price}</td>
              <td className="border py-1">{product.quantity}</td>
              <td className="border py-1">{product.sold}</td>
              <td className="border py-1">{product.color}</td>
              <td className="border py-1">
                <img
                  src={product.thumbnail}
                  alt="p"
                  className="w-12 h-12 object-cover"
                />
              </td>
              <td className="">
                <span
                  onClick={() => setEditProduct(product)}
                  className="text-blue-700 cursor-pointer font-semibold text-sm px-2 "
                >
                  Edit
                </span>
                <span
                  onClick={() => handleDeleteProduct(product._id)}
                  className="text-main cursor-pointer font-semibold text-sm px-2"
                >
                  Delete
                </span>
                <span
                  onClick={() => setCustomizeVarriants(product)}
                  className="text-green-700 cursor-pointer font-semibold text-sm px-2"
                >
                  Varriants
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full flex justify-center items-center">
        <Pagination totalCount={counts} />
      </div>
    </div>
  );
};

export default ManageProducts;
