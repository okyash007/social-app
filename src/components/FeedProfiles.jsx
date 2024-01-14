import React, { useState } from "react";
import { useFetchData2 } from "../api/useFetchData2";
import UserCard from "./UserCard";

const FeedProfiles = () => {
  const [feedProfile, setFeedProfile] = useState(null);
  useFetchData2(
    "https://gitsta.onrender.com/api/v1/user/feedprofile",
    " ",
    feedProfilesReciver
  );

  function feedProfilesReciver(data) {
    if (data.sucess == true) {
      setFeedProfile(data.data);
    }
  }

  if (!feedProfile) {
    return (
      <div className="flex justify-center max-lg:hidden">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="w-1/4 pt-20 space-y-2 max-lg:hidden">
      {feedProfile.map((m) => (
        <UserCard
          key={m._id}
          avatar={m.avatar}
          username={m.username}
          fullname={m.fullname}
        />
      ))}
    </div>
  );
};

export default FeedProfiles;
