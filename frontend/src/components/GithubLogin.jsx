import React, { useState } from "react";
import { GithubAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import { makePostRequest } from "../api/makePostRequest";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../store/appSlice";
import { backendDomain } from "../utils/constants";

const GithubLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function callBack(data) {
    setLoading(false);

    if (data.sucess === false) {
      setError(data.message);
      toast(
        <div className="text-red-700 rounded-lg text-sm font-bold addfont">
          {data.message}
        </div>,
        {
          duration: 5000,
        }
      );
    }
    if (data.sucess === true) {
      dispatch(setUser(data.data));
      navigate("/");
      console.log(data);
    }
  }

  if (error) {
  }

  const handleGithubLogin = async () => {
    try {
      setLoading(true);
      const provider = new GithubAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const userData = result._tokenResponse;
      console.log(result);
      console.log({
        fullname: userData.displayName,
        username: userData.screenName,
        avatar: userData.photoUrl,
        password: result.user?.uid,
      });
      makePostRequest(
        `${backendDomain}/api/v1/user/start`,
        {
          fullname: userData.displayName,
          username: userData.screenName,
          avatar: userData.photoUrl,
          password: result.user?.uid,
        },
        callBack
      );
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <button
      className={error ? "btn btn-sm ring-2 ring-red-600" : "btn btn-sm"}
      disabled={loading ? "disable" : ""}
      onClick={handleGithubLogin}
    >
      get Started
    </button>
  );
};

export default GithubLogin;
