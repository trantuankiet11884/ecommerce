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
} from "./pages/public";
import path from "./utils/path.js";

function App() {
  return (
    <div className="min-h-screen font-main">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />}></Route>
          <Route path={path.LOGIN} element={<Login />}></Route>
          <Route path={path.PRODUCTS} element={<Products />}></Route>
          <Route path={path.BLOGS} element={<Blogs />}></Route>
          <Route
            path={path.DETAILS_PRODUCT_PID_TITLE}
            element={<DetailsProduct />}
          ></Route>
          <Route path={path.FAQ} element={<FAQs />}></Route>
          <Route path={path.OUR_SERVICES} element={<Services />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
