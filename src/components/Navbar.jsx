import React, { useEffect } from "react";
import LightDarkToggle from "./LightDarkToggle";
import GithubLogin from "./GithubLogin";
import { toast, Toaster } from "sonner";
import { useSelector } from "react-redux";
import Profile from "./Profile";
import { Link, Navigate, useNavigate } from "react-router-dom";
import GetStartedModal from "./getStartedModal";

const Navbar = () => {
  const user = useSelector((store) => store.app.user);

  return (
    <>
      {!user && <Navigate to={"/landing"} />}
      <div className="flex flex-row justify-between p-2 fixed w-full bg-gradient-to-b from-base-300">
        <div>
          <Link
            to={"/"}
            className="btn bg-base-300 border-2 border-base-content border-opacity-10"
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
            <GetStartedModal />
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
