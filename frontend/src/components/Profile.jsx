import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setUserSlider } from "../store/appSlice";

const Profile = ({ avatar, username, fullname }) => {
  // const userSlider = useSelector((store) => store.app.userSlider);
  const dispatch = useDispatch();

  return (
    <>
      <div
        tabIndex={0}
        className="btn m-1 btn-square"
        onClick={() => dispatch(setUserSlider())}
      >
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img src={avatar} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
