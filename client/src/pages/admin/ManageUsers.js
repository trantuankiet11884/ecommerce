import React, { useCallback, useEffect, useState } from "react";
import { apiDeleteUser, apiGetUsers, apiUpdateUser } from "apis";
import { blocked, roles } from "utils/constant";
import moment from "moment";
import { Button, InputField, InputForm, Pagination, Select } from "components";
import icons from "utils/icons";
import useDebounce from "hooks/useDebounce";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const { AiFillEdit, BsFillTrashFill, AiOutlineStepBackward } = icons;

const ManageUsers = () => {
  const [params] = useSearchParams();
  const [users, setUsers] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [queries, setQueries] = useState({
    q: "",
  });
  const [update, setUpdate] = useState(false);
  const fetchUsers = async (params) => {
    const response = await apiGetUsers({
      ...params,
      limit: process.env.REACT_APP_LIMIT,
    });
    if (response.success) setUsers(response);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    firstName: "",
    lastName: "",
    role: "",
    mobile: "",
    isBlocked: "",
    email: "",
  });

  const render = useCallback(() => {
    setUpdate(!update);
  }, [update]);

  const queriesDebounce = useDebounce(queries.q, 800);

  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    if (queriesDebounce) queries.q = queriesDebounce;
    fetchUsers(queries);
  }, [queriesDebounce, params, update]);

  const handleUpdate = async (data) => {
    const response = await apiUpdateUser(data, editUser._id);
    if (response.success) {
      setEditUser(null);
      render();
      toast.success(response.message);
    } else toast.error(response.message);
  };

  const handleDeteleUser = (uid) => {
    Swal.fire({
      title: `Are you sure...`,
      text: `Are you sure deleted this user?`,
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteUser(uid);
        if (response.success) {
          render();
          toast.success(response.message);
        } else toast.error(response.message);
      }
    });
  };

  useEffect(() => {
    if (editUser)
      reset({
        firstName: editUser.firstName,
        lastName: editUser.lastName,
        role: editUser.role,
        mobile: editUser.mobile,
        isBlocked: editUser.isBlocked,
        email: editUser.email,
      });
  }, [editUser]);
  return (
    <div className="w-full p-4">
      <h1 className="h-20 flex justify-between items-center text-3xl font-semibold">
        <span>Manage Users</span>
      </h1>
      <div className="w-full">
        <div className="flex justify-end py-4">
          <InputField
            nameKey={"q"}
            value={queries.q}
            setValue={setQueries}
            placeholder="Search name or email..."
          />
        </div>
        <form onSubmit={handleSubmit(handleUpdate)}>
          {editUser && <Button type="submit">Update</Button>}
          <table className="table-auto mb-6 text-left w-full">
            <thead className=" font-semibold bg-gray-700 text-sm border border-gray-300 ">
              <tr>
                <th className="px-1 py-2 ">#</th>
                <th className="px-1 py-2 ">FirstName</th>
                <th className="px-1 py-2 ">LastName</th>
                <th className="px-1 py-2 ">Phone</th>
                <th className="px-1 py-2 ">Role</th>
                <th className="px-1 py-2 ">Status</th>
                <th className="px-1 py-2 ">Email</th>
                <th className="px-1 py-2 ">Created At</th>
                <th className="px-1 py-2 ">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.users?.map((user, idx) => (
                <tr key={user.id} className="border border-gray-500">
                  <td className="px-1 py-2">{idx + 1}</td>
                  <td className="px-1 py-2">
                    {editUser?._id === user?._id ? (
                      <InputForm
                        register={register}
                        fullWidth
                        errors={errors}
                        defaultValue={user.firstName}
                        id={"firstName"}
                        validate={{ required: "Required Fill !!!" }}
                      />
                    ) : (
                      <span>{user.firstName}</span>
                    )}
                  </td>
                  <td className="px-1 py-2">
                    {editUser?._id === user?._id ? (
                      <InputForm
                        register={register}
                        fullWidth
                        errors={errors}
                        defaultValue={user.lastName}
                        id={"lastName"}
                        validate={{ required: "Required Fill !!!" }}
                      />
                    ) : (
                      <span>{user.lastName}</span>
                    )}
                  </td>
                  <td className="px-1 py-2">
                    {editUser?._id === user?._id ? (
                      <InputForm
                        register={register}
                        fullWidth
                        errors={errors}
                        defaultValue={user.mobile}
                        id={"mobile"}
                        validate={{
                          required: true,
                          pattern: {
                            value: /^[62|0]+\d{9}/gi,
                            message: "Invalid Number",
                          },
                        }}
                      />
                    ) : (
                      <span>{user.mobile}</span>
                    )}
                  </td>
                  <td className="px-1 py-2">
                    {editUser?._id === user._id ? (
                      <Select
                        register={register}
                        fullWidth
                        errors={errors}
                        defaultValue={user.role}
                        id={"role"}
                        validate={{ required: "Required Fill !!!" }}
                        options={roles}
                      />
                    ) : (
                      <span>
                        {roles.find((role) => +role.code === +user.role)?.value}
                      </span>
                    )}
                  </td>
                  <td className="px-1 py-2">
                    {editUser?._id === user._id ? (
                      <Select
                        register={register}
                        fullWidth
                        errors={errors}
                        defaultValue={user.isBlocked}
                        id={"isBlocked"}
                        validate={{ required: "Required Fill !!!" }}
                        options={blocked}
                      />
                    ) : (
                      <span>{user.isBlocked ? "Blocked" : "Active"}</span>
                    )}
                  </td>

                  <td className="px-1 py-2">
                    {editUser?._id === user?._id ? (
                      <InputForm
                        fullWidth
                        register={register}
                        errors={errors}
                        defaultValue={user.email}
                        id={"email"}
                        validate={{
                          required: true,
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid Email",
                          },
                        }}
                      />
                    ) : (
                      <span>{user.email}</span>
                    )}
                  </td>
                  <td className="px-1 py-2">
                    {moment(user.createdAt).format("DD/MM/YYYY")}
                  </td>
                  <td className="px-1 py-2">
                    <div className="flex justify-between">
                      <span className="cursor-pointer">
                        {editUser?._id === user?._id ? (
                          <span onClick={() => setEditUser(null)}>Back</span>
                        ) : (
                          <span
                            onClick={() => setEditUser(user)}
                            className="text-blue-700 font-semibold text-sm"
                          >
                            Edit
                          </span>
                        )}
                      </span>
                      <span className="cursor-pointer">
                        <span
                          onClick={() => handleDeteleUser(user?._id)}
                          className="text-main font-semibold text-sm"
                        >
                          Delete
                        </span>
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
        <div className="w-full text-center">
          <Pagination totalCount={users?.counts} />
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
