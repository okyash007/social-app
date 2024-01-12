import React, { useState } from "react";
import { useFetchData2 } from "../api/useFetchData2";
import { useSelector } from "react-redux";

const PostComments = ({ postId }) => {
  const user = useSelector((store) => store.app.user);
  const [comments, setComments] = useState(null);
  useFetchData2("https://gitsta.onrender.com/api/v1/comment/" + postId, user, commentReciver);

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

  return (
    <div className="flex flex-col items-center p-2 space-y-2">
      {comments.map((m) => (
        <div
          key={m._id}
          className="bg-base-300 flex w-1/2 max-sm:w-full flex-row  gap-2 rounded-xl p-2"
        >
          <div className="avatar">
            <div className="w-10 h-10 rounded-full">
              <img src={m.user.avatar} />
            </div>
          </div>
          <div className="w-3/4">
            <p className="text-xs font-semibold opacity-60">
              {"@" + m.user.username}
            </p>
            <p className="text-xs font-semibold break-words ">{m.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostComments;
