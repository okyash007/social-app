import React from "react";
import { makePostRequest } from "../api/makePostRequest";
import { Link } from "react-router-dom";

const AcessChatBtn = ({ uid, fromid }) => {
  function callBack(data) {
    console.log(data);
  }

  return (
    <Link
      to={"/chat/" + fromid}
      className="btn bg-base-300 flex-grow join-item"
    >
      <button
      //   onClick={() => {
      //     makePostRequest("/api/v1/chat/acess", { uid, fromid }, callBack);
      //   }}
      >
        message
      </button>
    </Link>
  );
};

export default AcessChatBtn;
