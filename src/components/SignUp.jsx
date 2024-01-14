import React, { useState } from "react";
import { makePostRequest } from "../api/makePostRequest";
import { trimString } from "../utils/helper";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../store/appSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: null,
    fullname: null,
    password: null,
  });
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [signUpError, setSignUpError] = useState(null);

  function changeFormData(key, value) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  function userDataReciver(data) {
    console.log(data);
    setSignUpLoading(false);
    if (data.sucess == false) {
      setSignUpError(data.message);
      return;
    } else if (data.sucess == true) {
      dispatch(setUser(data.data));
      navigate("/");
    }
  }

  return (
    <>
      <div className="space-y-2">
        <h3 className="font-bold text-lg">Get started</h3>
        <input
          type="text"
          placeholder="username"
          className="input input-bordered w-full"
          onChange={(e) =>
            changeFormData("username", trimString(e.target.value))
          }
        />
        <input
          type="text"
          placeholder="fullname"
          className="input input-bordered w-full"
          onChange={(e) =>
            changeFormData("fullname", trimString(e.target.value))
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
        {signUpError && (
          <p className="text-red-500 text-xs px-1">{signUpError}</p>
        )}
        {signUpLoading ? (
          <div className="flex justify-center p-2 border-2 border-base-content rounded-full border-opacity-20">
            <span className="loading loading-dots loading-md"></span>
          </div>
        ) : (
          <button
            disabled={
              Object.values(formData).every((v) => v !== null) ? false : true
            }
            onClick={() => {
              setSignUpLoading(true);
              makePostRequest(
                "https://gitsta.onrender.com/api/v1/user/signup",
                formData,
                userDataReciver
              );
            }}
            className="btn bg-base-100 w-full border-1 border-base-content border-opacity-20"
          >
            SignUp
          </button>
        )}
      </div>
    </>
  );
};

export default SignUp;
