import React, { useEffect, useState } from "react";
import { makePostRequest } from "../api/makePostRequest";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "../components/UserCard";
import Messages from "../components/Messages";
import { addChats } from "../store/appSlice";
import { backendDomain } from "../utils/constants";

const ChatPage = () => {
  const { id } = useParams();
  const user = useSelector((store) => store.app.user);
  const [chatData, setChatData] = useState(null);

  function callback(data) {
    if (!data) {
      return;
    } else if (data.sucess == false) {
      return;
    } else {
      setChatData(data.data);
    }
  }

  useEffect(() => {
    makePostRequest(
      `${backendDomain}/api/v1/chat/acess`,
      { uid: user._id, fromid: id },
      callback
    );
  }, []);

  if (!chatData) {
    return (
      <div className="flex justify-center pt-12">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  const userData = chatData.users.filter((m) => m._id === id);

  return (
    <div className="pt-12 flex flex-col p-2 h-full relative items-center">
      <div className="fixed w-1/2 max-sm:w-full flex flex-col z-10 p-3">
        <UserCard
          username={userData[0].username}
          avatar={userData[0].avatar}
          fullname={userData[0].fullname}
        />
      </div>
      <Messages chatId={chatData._id} reciverId={id} />
    </div>
  );
};

export default ChatPage;
