import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { makePostRequest } from "../api/makePostRequest";
import { useFetchData2 } from "../api/useFetchData2";
import { io } from "socket.io-client";
import { formatDateAndTime } from "../utils/helper";

const socket = io.connect("https://gitsta.onrender.com");

const Messages = ({ chatId, reciverId }) => {
  const messageEndRef = useRef(null);
  //   console.log(chatId);
  const user = useSelector((store) => store.app.user);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [sendLoading, setSendLoading] = useState(false);

  function messageReciver(data) {
    // console.log(data.data);
    setSendLoading(false);
    if (!data) {
      return;
    } else if (data.sucess === false) {
      return;
    } else if (data.sucess === true) {
      socket.emit("send_message", { message: data.data, room: chatId });
      setMessages((prev) => [...prev, data.data]);
      setMessage("");
    }
  }

  function allMessageReciver(allMessages) {
    socket.emit("join_room", chatId);

    if (!allMessages) {
      return;
    } else if (allMessages.sucess === false) {
      return;
    } else if (allMessages.sucess === true) {
      setMessages(allMessages.data);
    }
  }

  useFetchData2(
    "https://gitsta.onrender.com/api/v1/message/" + chatId,
    "",
    allMessageReciver
  );

  useEffect(() => {
    socket.on("receive_message", (data) => {
      //   console.log(data);
      setMessages((prev) => [...prev, data]);
    });
  }, [socket]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView();
  }, [messages]);

  //   if (!messages) {
  //     return (
  //       <div className="flex h-full justify-center items-center">
  //         <span className="loading loading-dots loading-lg"></span>
  //       </div>
  //     );
  //   }

  return (
    <div className="w-1/2 max-sm:w-full flex-grow h-full gap-2 flex flex-col">
      <div className="flex-grow bg-base-300 rounded-2xl border-opacity-10 border-2 border-base-content overflow-y-scroll scroll-bar pt-32 pb-3">
        {messages.map((m) => (
          <div key={m._id}>
            <div
              className={
                m.sender._id == reciverId
                  ? " flex justify-start"
                  : "flex justify-end"
              }
            >
              <div className="m-1 max-w-[80%]">
                <p className="text-xs font-semibold">
                  {formatDateAndTime(m.createdAt).date}
                </p>
                <p
                  className="bg-base-content bg-opacity-10 text-sm p-2 px-3 rounded-xl break-words"
                  key={m._id}
                >
                  {m.content}
                </p>
                <p className="text-xs font-semibold">
                  {formatDateAndTime(m.createdAt).time}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
      <div className="join flex flex-row">
        <textarea
          className="textarea textarea-bordered w-full rounded-xl join-item bg-base-300"
          placeholder="Bio"
          onChange={(e) => setMessage(e.target.value.trim())}
          //   onFocus={() => console.log("typing")}
        ></textarea>
        {sendLoading ? (
          <div className="join-item bg-base-300 flex justify-center items-center px-6 rounded-r-xl border-1 border-opacity-20 border-base-content">
            <span className="loading loading-spinner loading-sm"></span>
          </div>
        ) : (
          <button
            disabled={message ? false : true}
            className="btn join-item border-1 border-opacity-20 border-base-content h-full rounded-xl bg-base-300"
            onClick={() => {
              setSendLoading(true);
              makePostRequest(
                "https://gitsta.onrender.com/api/v1/message/send",
                {
                  senderId: user._id,
                  reciverId: reciverId,
                  chatId: chatId,
                  content: message,
                },
                messageReciver
              );
            }}
          >
            send
          </button>
        )}
      </div>
    </div>
  );
};

export default Messages;
