import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makePostRequest } from "../api/makePostRequest";
import { useFetchData2 } from "../api/useFetchData2";

const CommentCard = ({ comment }) => {
  console.log(comment);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.app.user);
  const [comments, setComments] = useState([]);
  const [sendReplyLoading, setSendReplyLoading] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [reply, setReply] = useState({
    to: null,
    content: null,
  });

  useFetchData2(
    "https://gitsta.onrender.com/api/v1/comment/replies/" + comment._id,
    sendReplyLoading,
    commentRepliesReciver
  );

  function commentRepliesReciver(data) {
    if (data.sucess == true) {
      setComments(data.data);
    }
  }

  function changeReply(key, value) {
    setReply((prev) => ({ ...prev, [key]: value }));
  }

  function replyReciver(data) {
    setSendReplyLoading(false);
    changeReply("to", null);
    if (data.sucess == true) {
      dispatch(setUser(data.data));
    } else {
      return;
    }
  }

  return (
    <div className="mt-2 border-2 relative border-base-content border-opacity-10 p-3 rounded-xl">
      <div className="flex gap-2">
        <div className="avatar">
          <div className="w-10 h-10 rounded-full">
            <img src={comment.user.avatar} />
          </div>
        </div>
        <div className="max-w-full flex flex-col">
          <p className="text-xs font-semibold opacity-60">
            {"@" + comment.user.username}
          </p>
          <p className="text-xs font-semibold break-words">{comment.content}</p>
          {comments.length > 0 && (
            <button
              onClick={() => setShowReplies(!showReplies)}
              className="text-xs btn btn-sm btn-ghost p-0 opacity-60"
            >
              {showReplies ? "hide replies" : "show replies"}
            </button>
          )}
        </div>

        <button
          onClick={() => {
            if (!reply.to) {
              changeReply("to", comment._id);
            } else if (reply.to == comment._id) {
              changeReply("to", null);
            } else {
              changeReply("to", comment._id);
            }
          }}
          className="absolute right-1 btn btn-sm text-xs p-1 px-2 btn-ghost"
        >
          reply
        </button>
      </div>
      {reply.to == comment._id && (
        <div className="flex rounded-xl flex-row join mt-2">
          <textarea
            className=" flex-grow text-xs p-2 rounded-xl join-item textarea textarea-bordered"
            placeholder="reply here"
            onChange={(e) => changeReply("content", e.target.value)}
          ></textarea>
          <div>
            {sendReplyLoading ? (
              <div className="join-item border-1 border-opacity-20 border-base-content flex justify-center items-center p-3 rounded-3xl h-full bg-base-300">
                <span className="loading loading-spinner loading-sm"></span>
              </div>
            ) : (
              <button
                onClick={() => {
                  setSendReplyLoading(true);
                  makePostRequest(
                    "https://gitsta.onrender.com/api/v1/comment/reply",
                    {
                      uid: user._id,
                      postid: comment.post,
                      content: reply.content,
                      commentid: reply.to,
                    },
                    replyReciver
                  );
                }}
                disabled={reply.content ? false : true}
                className="btn h-full bg-base-100 border-1 border-base-content border-opacity-20 join-item"
              >
                send
              </button>
            )}
          </div>
        </div>
      )}
      {showReplies && comments.length > 0 &&
        comments.map((m) => <CommentCard key={m._id} comment={m} />)}
    </div>
  );
};

export default CommentCard;
