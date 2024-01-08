import React, { useEffect } from "react";
import LightDarkToggle from "./LightDarkToggle";
import GithubLogin from "./GithubLogin";
import { toast, Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import Profile from "./Profile";
import { Link, useNavigate } from "react-router-dom";
import { useFetchData } from "../api/useFetchData";
import { setUser } from "../store/appSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.app.user);

  useEffect(() => {
    if (!user) {
      navigate("/landing");
    }
  }, [user]);

  return (
    <>
      <div className="flex flex-row justify-between p-2 fixed w-full bg-gradient-to-b from-base-300">
        <div>
          <Link
            to={"/"}
            className="btn btn-sm"
            // onClick={() =>
            //   toast(
            //     <div className="text-red-700 rounded-full text-xs px-4 p-2 m-2 bg-opacity-10 bg-black font-extrabold addfont">
            //       A custom toast with default styling
            //     </div>,
            //     {
            //       duration: 5000,
            //     }
            //   )
            // }
          >
            <span>
              <span className="font-bold bg-bas">git</span>
              <span className="font-thin">sta</span>
            </span>
          </Link>
        </div>
        <div className="space-x-2 flex items-center flex-row">
          <LightDarkToggle />
          {user ? (
            <Profile
              avatar={user.avatar}
              username={user.username}
              fullname={user.fullname}
            />
          ) : (
            <GithubLogin />
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
