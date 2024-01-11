import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { trimString } from "../utils/helper";
import { makePostRequest } from "../api/makePostRequest";
import { setUser } from "../store/appSlice";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: null,
    password: null,
  });
  const [signInLoading, setSignInLoading] = useState(false);
  const [signInError, setSignInError] = useState(null);

  function changeFormData(key, value) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  function userDataReciver(data) {
    console.log(data);
    setSignInLoading(false);
    if (data.sucess == false) {
      setSignInError(data.message);
      return;
    } else if (data.sucess == true) {
      dispatch(setUser(data.data));
      navigate("/");
    }
  }

  return (
    <>
      <div className="space-y-2">
        <div className="space-x-1">
          <span className="font-bold text-lg">Login</span>
          <span className="text-xs font-medium">
            here for adding the details
          </span>
        </div>
        <input
          type="text"
          placeholder="username"
          className="input input-bordered w-full"
          onChange={(e) =>
            changeFormData("username", trimString(e.target.value))
          }
        />
        <input
          type="password"
          placeholder="password"
          className="input input-bordered w-full"
          onChange={(e) =>
            changeFormData("password", trimString(e.target.value))
          }
        />
        {signInError && (
          <p className="text-red-500 text-xs px-1">{signInError}</p>
        )}
        {signInLoading ? (
          <div className="flex justify-center p-2 border-2 border-base-content rounded-full border-opacity-20">
            <span className="loading loading-dots loading-md"></span>
          </div>
        ) : (
          <button
            disabled={
              Object.values(formData).every((v) => v !== null) ? false : true
            }
            onClick={() => {
              setSignInLoading(true);
              makePostRequest("https://gitsta.onrender.com/api/v1/user/signin", formData, userDataReciver);
            }}
            className="btn bg-base-100 border-1 border-base-content border-opacity-20 w-full"
          >
            SignIn
          </button>
        )}
      </div>
    </>
  );
};

export default SignIn;
