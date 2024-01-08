import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchData } from "../api/useFetchData";
import GithubRepos from "../components/GithubRepos";
import { AnimatePresence, motion } from "framer-motion";
import ProfilePosts from "../components/ProfilePosts";
import { useDispatch, useSelector } from "react-redux";
import { makePostRequest } from "../api/makePostRequest";
import { setUser } from "../store/appSlice";

const ProfilePage = () => {
  const store = useSelector((store) => store.app);
  const dispatch = useDispatch();
  const params = useParams();
  const username = params.username;
  const [tab, setTab] = useState("posts");
  const [followError, setFollowError] = useState(null);
  const [followLoading, setFollowLoading] = useState(false);

  const data = useFetchData("https://gitsta.onrender.com/api/v1/user/profile/" + username);
  const githubData = useFetchData(
    `https://api.github.com/users/${username}/repos`
  );

  if (!data) {
    return null;
  } else if (data.sucess === false) {
    return null;
  }

  const userData = data.data?.data;

  if (!userData) {
    return (
      <div className="flex justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  function callBack(data) {
    setFollowLoading(false);
    if (!data.data) {
      setFollowError("somethong went wrong");
    } else if (data.sucess === false) {
      setFollowError("somethong went wrong");
    } else {
      dispatch(setUser(data.data));
    }
  }

  return (
    <div className=" flex flex-col mt-12 relative items-center">
      <div className=" fixed w-1/2 max-md:w-full z-10 p-2">
        <div className="border-2 border-base-content border-opacity-10 rounded-xl p-2 bg-base-300 flex flex-row space-x-2 ">
          <img
            src={userData.avatar}
            width={50}
            height={50}
            className="rounded-full"
            alt=""
          />
          <div>
            <p className="text-2xl font-extrabold">{userData.fullname}</p>
            <p className="text-xs font-semibold opacity-50">
              {"@" + userData.username}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-grow w-1/2 max-md:w-full p-2 pt-20 ">
        {username != store.user.username && (
          <div>
            {followLoading ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              <button
                className="btn"
                onClick={() => {
                  setFollowLoading(true);
                  makePostRequest(
                    "https://gitsta.onrender.com/api/v1/user/follow/" + username,
                    {
                      uid: store.user._id,
                    },
                    callBack
                  );
                }}
              >
                {store.user.following.includes(userData._id)
                  ? "unfollow"
                  : "follow"}
              </button>
            )}
          </div>
        )}

        <div
          role="tablist"
          className="tabs bg-base-300 border-2 border-opacity-10 border-base-content rounded-xl tabs-boxed my-2"
        >
          <a
            role="tab"
            onClick={() => setTab("posts")}
            className={
              tab === "posts"
                ? "tab font-semibold text-sm transition-all bg-neutral bg-opacity-30 "
                : "tab transition-all text-sm font-semibold "
            }
          >
            Posts
          </a>
          <a
            role="tab"
            onClick={() => setTab("repos")}
            className={
              tab === "repos"
                ? "tab font-semibold text-sm transition-all bg-neutral bg-opacity-30 "
                : "tab transition-all text-sm font-semibold "
            }
          >
            Repos
          </a>
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {tab === "posts" && <ProfilePosts posts={userData.posts} />}
            {tab === "repos" && <GithubRepos username={username} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProfilePage;
