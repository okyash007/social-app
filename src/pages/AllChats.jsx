import React, { useState } from "react";
import { useFetchData2 } from "../api/useFetchData2";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ChatCard from "../components/ChatCard";
import { backendDomain } from "../utils/constants";

const AllChats = () => {
  const user = useSelector((store) => store.app.user);
  const [allChats, setAllChats] = useState(null);

  function allChatsReciver(data) {
    // console.log(data);
    setAllChats(data.data);
  }

  useFetchData2(
    `${backendDomain}/api/v1/chat/${user._id}`,
    "",
    allChatsReciver
  );

  if (!allChats) {
    return (
      <div className="flex justify-center pt-12">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  console.log(allChats);

  return (
    <div className="flex justify-center">
      <div className="w-1/2 max-sm:w-full pt-12">
        {allChats.map((m) => (
          <ChatCard key={m._id} chatData={m} myId={user._id} />
        ))}
      </div>
    </div>
  );
};

export default AllChats;
