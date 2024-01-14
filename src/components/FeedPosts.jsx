import React, { useState } from "react";
import { useFetchData2 } from "../api/useFetchData2";
import { Link } from "react-router-dom";

const FeedPosts = () => {
  const [feedPost, setFeedPost] = useState(null);
  useFetchData2(
    "https://gitsta.onrender.com/api/v1/post/all",
    " ",
    feedPostsReciver
  );

  function feedPostsReciver(data) {
    console.log(data);
    if (data.sucess == true) {
      setFeedPost(data.data);
    }
  }

  if (!feedPost) {
    return (
      <div className="flex justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {feedPost.map((m) => (
        <Link
          to={"/post/" + m._id}
          key={m._id}
          className="p-2 bg-base-300 rounded-xl hover:bg-neutral hover:bg-opacity-25 transition-all space-y-2 flex border-2 border-base-content border-opacity-5 flex-col"
        >
          <Link
            to={"/profile/" + m.user.username}
            className="hover:bg-opacity-100 hover:bg-base-100 transition-all w-fit p-2 border-2 border-base-content border-opacity-5 rounded-xl flex gap-2"
          >
            <div className="avatar">
              <div className="w-10 h-10 aspect-square rounded-full">
                <img src={m.user.avatar} />
              </div>
            </div>
            <div>
              <p className="font-bold">{m.user.fullname}</p>
              <p className="text-xs font-bold opacity-60">
                {"@" + m.user.username}
              </p>
            </div>
          </Link>
          <div className="avatar">
            <div className="w-full aspect-square rounded-xl">
              <img src={m.image} />
            </div>
          </div>
          <div>
            <p className="font-bold text-xs">{m.text}</p>
            <div className="space-x-1">
              <span className="font-semibold text-xs bg-base-content p-1 bg-opacity-10 rounded-lg">
                {m.likes.length}
              </span>
              <span className="font-semibold text-xs opacity-60">likes</span>
              <span className="font-semibold text-xs bg-base-content p-1 bg-opacity-10 rounded-lg">
                {m.comments.length}
              </span>
              <span className="font-semibold text-xs opacity-60">comments</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FeedPosts;
