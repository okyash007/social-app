import React from "react";
import { Link } from "react-router-dom";
import { formatDateAndTime } from "../utils/helper";

const ChatCard = ({ chatData, myId }) => {
  const userData = chatData.users.filter((m) => m._id !== myId);

  if(!chatData.latestMessage){
    return
  }

  return (
    <Link to={"/chat/" + userData[0]._id}>
      <div className="border-2 border-base-content m-2 flex gap-2 items-center flex-row flex-grow border-opacity-10 rounded-xl p-3 bg-base-300 hover:bg-base-content hover:bg-opacity-5 active:bg-neutral active:bg-opacity-35 transition-all ">
        <div className="avatar">
          <div className="w-16 rounded-full">
            <img src={userData[0].avatar} />
          </div>
        </div>
        <div>
          <p className="font-bold">{userData[0].fullname}</p>
          <p className="text-xs font-semibold opacity-60">
            {"@" + userData[0].username}
          </p>
          <p className="text-xs bg-base-content p-1 px-2 space-x-2 rounded-xl bg-opacity-10 font-semibold mt-2">
            <span>{chatData.latestMessage.content}</span>
            <span>
              {formatDateAndTime(chatData.latestMessage.createdAt).time}
            </span>
            <span>
              {formatDateAndTime(chatData.latestMessage.createdAt).date}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ChatCard;
