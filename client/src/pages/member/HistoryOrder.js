import React, { useEffect, useState } from "react";
import { apiGetOrder, apiGetUserOrder } from "apis/order";
import { useForm } from "react-hook-form";
import { CustomSelect, InputForm, Pagination } from "components";
import { createSearchParams, useSearchParams } from "react-router-dom";
import moment from "moment";
import { formatMoney } from "utils/fn";
import { statusOrders } from "utils/constant";
import { withNavigate } from "hocs";

const HistoryOrder = ({ navigate, location }) => {
  const [params] = useSearchParams();

  const [orders, setOrders] = useState(null);
  const [counts, setCounts] = useState(0);
  const {
    register,
    formState: { errors },
    watch,
  } = useForm();
  const q = watch("q");
  const status = watch("status");
  const fetchOrders = async (params) => {
    const response = await apiGetUserOrder({
      ...params,
      limit: process.env.REACT_APP_LIMIT,
    });
    if (response.success) {
      setOrders(response.orders);
      setCounts(response.counts);
    }
  };
  useEffect(() => {
    const pr = Object.fromEntries([...params]);
    fetchOrders(pr);
  }, [params]);
  const handleSearchStatus = (value) => {
    navigate({
      pathname: location.pathname,
      search: createSearchParams({ status: value }).toString(),
    });
  };

  return (
    <div className="w-full relative p-4">
      <header className="text-3xl font-semibold ">Order</header>
      <div>
        <form className="flex items-center gap-4">
          <InputForm
            register={register}
            id={"q"}
            errors={errors}
            fullWidth
            placeholder="Search by status..."
          />

          <CustomSelect
            options={statusOrders}
            value={status}
            onChange={(val) => handleSearchStatus(val)}
          />
        </form>
      </div>
      <div className="w-full">
        <table className="w-full table-fixed border">
          <thead>
            <tr className="border">
              <th className="border">STT</th>
              <th className="border">Products</th>
              <th className="border">Total</th>
              <th className="border">Status</th>
              <th className="border">CreatedAt</th>
              <th className="border">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {orders?.map((item, idx) => (
              <tr key={item._id} className="text-center border">
                <td className="border py-1">
                  {(+params.get("page") > 1 ? +params.get("page") - 1 : 0) *
                    process.env.REACT_APP_LIMIT +
                    idx +
                    1}
                </td>
                <td className="border py-1">
                  <span className="flex flex-col justify-center">
                    {item.products?.map((el) => (
                      <span
                        key={el._id}
                        className="flex items-center gap-2 text-center"
                      >
                        <img
                          src={el?.thumbnail}
                          alt="product"
                          className="w-8 h-8 rounded-md object-cover"
                        />
                        <span className="flex flex-col">
                          <span className="text-main text-xs">{el?.title}</span>
                          <span className="">
                            <span className="text-xs">Quantity: </span>
                            <span className="text-main text-xs">
                              {el?.quantity}
                            </span>
                          </span>
                        </span>
                      </span>
                    ))}
                  </span>
                </td>
                <td className="border py-1">
                  {formatMoney(item.total * 23500) + " VNĐ"}
                </td>
                <td className="border py-1">{item.status}</td>
                <td className="border py-1">
                  {moment(item.createdAt).format("DD/MM/YYYY")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full flex justify-center items-center">
        <Pagination totalCount={counts} />
      </div>
    </div>
  );
};

export default withNavigate(HistoryOrder);
