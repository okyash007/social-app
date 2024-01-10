import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ avatar, username, fullname }) => {
  return (
    <Link
      to={"/profile/" + username}
      className="border-2 border-base-content btn border-opacity-30 p-3 h-16 rounded-2xl flex flex-row justify-center"
    >
      <div className="flex flex-row items-center left-3 gap-2">
        <img
          src={avatar}
          width={40}
          height={40}
          className="rounded-full"
          alt=""
        />
        <div>
          <p className="font-semibold">{fullname}</p>{" "}
          <p className="text-xs opacity-60">{"@" + username}</p>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
