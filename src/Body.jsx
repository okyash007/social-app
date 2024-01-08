import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import UserSlider from "./components/UserSlider";
import { useDispatch, useSelector } from "react-redux";
import { useFetchData } from "./api/useFetchData";
import { setUser } from "./store/appSlice";

const Body = () => {
  const user = useSelector((store) => store.app.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      async function fetchData() {
        try {
          const response = await fetch("https://gitsta.onrender.com/api/v1/user/profile/" + user.username);
          const data = await response.json();
          // setData(data);
          dispatch(setUser(data.data));
          console.log(data.data);
        } catch (error) {
          // setData(data);
        }
      }

      fetchData();
    }
  }, []);

  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="z-10">
          <Navbar />
          <UserSlider />
        </div>

        <div className=" z-0 h-screen">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Body;
