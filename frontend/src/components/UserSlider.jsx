import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserSlider } from "../store/appSlice";
import { motion, AnimatePresence } from "framer-motion";
import UserCard from "./UserCard";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const UserSlider = () => {
  const dispatch = useDispatch();
  const store = useSelector((store) => store.app);
  const user = store.user;

  return (
    <AnimatePresence>
      {store.userSlider && (
        <>
          <motion.div
            onClick={() => dispatch(setUserSlider())}
            className="bg-black fixed w-full h-screen bg-opacity-70 top-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          ></motion.div>

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "tween" }}
            className=" w-1/2 mx-auto max-sm:w-full p-2"
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
            }}
            onDragEnd={(e, { offset, velocity }) => {
              if (offset.y > 50 || velocity.y > 500) {
                dispatch(setUserSlider());
              }
            }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
          >
            <div className="bg-base-100 rounded-3xl border-2 border-base-content border-opacity-40 flex flex-col items-center ">
              <div className="bg-base-content bg-opacity-25 w-[30%] m-2 rounded-full cursor-pointer h-2"></div>
              <div
                className="p-3 flex flex-wrap justify-center w-full gap-2"
                onClick={() => dispatch(setUserSlider())}
              >
                <UserCard
                  avatar={user.avatar}
                  fullname={user.fullname}
                  username={user.username}
                />

                <Link
                  to={"/create"}
                  className="btn border-2 flex-grow h-16 rounded-2xl text-5xl border-base-content border-opacity-30"
                >
                  +
                </Link>
                <Link
                  to={"/search"}
                  className="btn border-2 flex-grow h-16 rounded-2xl text-5xl border-base-content border-opacity-30"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="25"
                    height="25"
                    viewBox="0 0 50 50"
                    stroke="currentColor"
                    fill="currentColor"
                  >
                    <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
                  </svg>
                </Link>
                <Link
                  to={"/chat"}
                  className="btn border-2 h-16 rounded-2xl flex-grow  border-base-content border-opacity-30"
                >
                  Chats
                </Link>
                <Link
                  to={"/settings"}
                  className="btn border-2 h-16 rounded-2xl flex-grow  border-base-content border-opacity-30"
                >
                  Settings
                </Link>
                <Logout />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default UserSlider;
