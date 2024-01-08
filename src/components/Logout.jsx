import React from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../store/appSlice";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutHandler = () => {
    navigate("/landing");
    dispatch(setUser(null));
  };

  return (
    <button
      onClick={logOutHandler}
      className="btn border-2 h-16 rounded-2xl  border-base-content border-opacity-30"
    >
      logout
    </button>
  );
};

export default Logout;
