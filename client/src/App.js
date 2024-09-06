import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  Login,
  Home,
  Public,
  Blogs,
  DetailsProduct,
  FAQs,
  Services,
  Products,
  FinalRegister,
  ResetPassword,
  DetailsCart,
} from "./pages/public";
import path from "./utils/path.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { Cart, Modal } from "./components";
import {
  AdminLayout,
  CreateProducts,
  DashBoard,
  ManageOrder,
  ManageProducts,
  ManageUsers,
} from "pages/admin";
import {
  Checkout,
  HistoryOrder,
  MemberLayout,
  Personal,
  WishList,
} from "pages/member";
import { showCart } from "store/app/appSlice";
function App() {
  const dispatch = useDispatch();
  const { isShowModal, modalChildren, isShowCart } = useSelector(
    (state) => state.appReducer
  );
  return (
    <div className="font-main h-screen relative ">
      {isShowCart && (
        <div
          onClick={() => dispatch(showCart())}
          className="absolute inset-0 bg-overlay z-50 flex justify-end"
        >
          <Cart />
        </div>
      )}
      {isShowModal && <Modal>{modalChildren}</Modal>}
      <Routes>
        <Route path={path.CHECKOUT} element={<Checkout />}></Route>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />}></Route>
          <Route path={path.LOGIN} element={<Login />}></Route>
          <Route path={path.PRODUCTS_CATEGORY} element={<Products />}></Route>
          <Route path={path.BLOGS} element={<Blogs />}></Route>
          <Route path={path.FAQ} element={<FAQs />}></Route>
          <Route path={path.OUR_SERVICES} element={<Services />}></Route>
          <Route path={path.RESET_PASSWORD} element={<ResetPassword />}></Route>
          <Route
            path={path.DETAILS_PRODUCT_CATEGORY_PID_TITLE}
            element={<DetailsProduct />}
          ></Route>
          {/* <Route path={path.DETAIL_CART} element={<DetailsCart />}></Route> */}
        </Route>

        <Route path={path.ADMIN} element={<AdminLayout />}>
          <Route path={path.DASHBOARD} element={<DashBoard />} />
          <Route path={path.MANAGE_ORDER} element={<ManageOrder />} />
          <Route path={path.MANAGE_PRODUCTS} element={<ManageProducts />} />
          <Route path={path.MANAGE_USERS} element={<ManageUsers />} />
          <Route path={path.CREATE_PRODUCTS} element={<CreateProducts />} />
        </Route>

        <Route path={path.MEMBER} element={<MemberLayout />}>
          <Route path={path.PERSONAL} element={<Personal />} />
          <Route path={path.HISTORY_ORDER} element={<HistoryOrder />} />
          <Route path={path.WISHLIST} element={<WishList />} />
          <Route path={path.CART} element={<DetailsCart />} />
        </Route>

        <Route path={path.FINAL_REGISTER} element={<FinalRegister />}></Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
}

export default App;
