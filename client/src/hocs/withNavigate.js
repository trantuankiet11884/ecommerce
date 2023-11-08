import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const withNavigate = (Component) => (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  return (
    <Component
      {...props}
      navigate={navigate}
      dispatch={dispatch}
      location={location}
    />
  );
};

export default withNavigate;
