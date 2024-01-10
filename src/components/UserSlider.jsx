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
            className="bg-base-100 rounded-t-3xl border-2 border-base-content border-opacity-40 flex flex-col items-center"
            style={{
              position: "fixed",
              top: "50vh",
              left: 0,
              right: 0,
              height: "100vh",
            }}
            onDragEnd={(e, { offset, velocity }) => {
              if (offset.y > 50 || velocity.y > 500) {
                dispatch(setUserSlider());
              }
            }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
          >
            <div className="bg-base-content bg-opacity-25 w-[30%] m-2 rounded-full cursor-pointer h-2"></div>
            <div
              className="p-3 flex flex-wrap w-full gap-2"
              onClick={() => dispatch(setUserSlider())}
            >
              <UserCard
                avatar={user.avatar}
                fullname={user.fullname}
                username={user.username}
              />

              <Link
                to={"/create"}
                className="btn border-2 h-16 rounded-2xl text-5xl border-base-content border-opacity-30"
              >
                +
              </Link>
              <Link
                to={"/chat"}
                className="btn border-2 h-16 rounded-2xl  border-base-content border-opacity-30"
              >
                Chats
              </Link>
              <Logout />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default UserSlider;
