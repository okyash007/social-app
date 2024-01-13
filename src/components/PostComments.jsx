import React, { useState } from "react";
import { useFetchData2 } from "../api/useFetchData2";
import { useDispatch, useSelector } from "react-redux";
import { makePostRequest } from "../api/makePostRequest";
import { setUser } from "../store/appSlice";
import CommentCard from "./CommentCard";

const PostComments = ({ postId }) => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.app.user);
  const [comments, setComments] = useState(null);
  const [reply, setReply] = useState({
    to: null,
    content: null,
  });
  const [sendReplyLoading, setSendReplyLoading] = useState(false);

  function changeReply(key, value) {
    setReply((prev) => ({ ...prev, [key]: value }));
  }

  useFetchData2(
    "https://gitsta.onrender.com/api/v1/comment/" + postId,
    user,
    commentReciver
  );

  function commentReciver(data) {
    console.log(data);
    if (data.sucess == true) {
      setComments(data.data);
    } else {
      return;
    }
  }

  if (!comments) {
    return;
  }

  function replyReciver(data) {
    setSendReplyLoading(false);
    if (data.sucess == true) {
      dispatch(setUser(data.data));
    } else {
      return;
    }
  }

  return (
    <>
      <div className="flex flex-col items-center p-2 space-y-2">
        {comments.map((m, i) => (
          <div
            key={m._id}
            className="bg-base-300 w-1/2 border-2 border-base-content border-opacity-20 max-sm:w-full rounded-xl p-3"
          >
            <div key={m._id} className=" flex relative flex-row  gap-2 ">
              <div className="avatar">
                <div className="w-10 h-10 rounded-full">
                  <img src={m.user.avatar} />
                </div>
              </div>
              <div className="">
                <p className="text-xs font-semibold opacity-60">
                  {"@" + m.user.username}
                </p>
                <p className="text-xs font-semibold break-words">{m.content}</p>
                {reply.to == m._id && (
                  <div className="join w-full pt-2 flex flex-row">
                    <textarea
                      className="textarea textarea-bordered flex-grow rounded-3xl join-item bg-base-300"
                      placeholder="comment here"
                      value={reply.content}
                      onChange={(e) => changeReply("content", e.target.value)}
                    ></textarea>
                    <div>
                      {sendReplyLoading ? (
                        <div className="join-item border-1 border-opacity-20 border-base-content flex justify-center items-center p-4 rounded-3xl h-full bg-base-300">
                          <span className="loading loading-spinner loading-sm"></span>
                        </div>
                      ) : (
                        <button
                          disabled={reply.content ? false : true}
                          onClick={() => {
                            setSendReplyLoading(true);
                            changeReply("to", null);
                            makePostRequest(
                              "https://gitsta.onrender.com/api/v1/comment/reply",
                              {
                                uid: user._id,
                                postid: postId,
                                content: reply.content,
                                commentid: reply.to,
                              },
                              replyReciver
                            );
                          }}
                          className="btn join-item border-1 border-opacity-20 border-base-content  rounded-3xl h-full bg-base-300"
                        >
                          send
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  if (!reply.to) {
                    changeReply("to", m._id);
                  } else if (reply.to == m._id) {
                    changeReply("to", null);
                  } else {
                    changeReply("to", m._id);
                  }
                }}
                className="btn btn-sm absolute right-2 btn-ghost text-xs p-1 px-2"
              >
                reply
              </button>
            </div>
            <div className="">
              {m.replies.map((m) => (
                <CommentCard key={m._id} comment={m} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PostComments;
