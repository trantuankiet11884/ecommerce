import React, { memo, useEffect } from "react";
import path from "utils/path";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrent } from "store/user/asyncActions";
import icons from "utils/icons";
import { clearMessage, logout } from "store/user/userSlice";
import Swal from "sweetalert2";
const { AiOutlineLogout } = icons;

const TopHeader = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, current, message } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const timing = setTimeout(() => {
      if (isLoggedIn) dispatch(getCurrent());
    }, 300);
    return () => {
      clearTimeout(timing);
    };
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    if (message)
      Swal.fire("Oops !!!", message, "info").then(() => {
        dispatch(clearMessage());
        navigate(`/${path.LOGIN}`);
      });
  }, [message]);
  return (
    <div className="h-8 w-full flex justify-center">
      <div className="p-5 w-full flex items-center justify-between text-xs text-white bg-main">
        <span>ORDER ONLINE OR CALL US (+1800) 000 8808</span>
        {isLoggedIn && current ? (
          <div className="flex justify-center items-center gap-2">
            <span>{`Welcome, ${current.firstName} ${current.lastName}`}</span>
            <span onClick={() => dispatch(logout())}>
              <AiOutlineLogout size={16} className="cursor-pointer" />
            </span>
          </div>
        ) : (
          <Link className="hover:text-gray-800" to={`${path.LOGIN}`}>
            Sign In or Create Account
          </Link>
        )}
      </div>
    </div>
  );
};

export default memo(TopHeader);
