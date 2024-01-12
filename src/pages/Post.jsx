import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchData } from "../api/useFetchData";
import PostComments from "../components/PostComments";
import { formatDateAndTime } from "../utils/helper";
import { makePostRequest } from "../api/makePostRequest";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/appSlice";
import CommentSlider from "../components/CommentSlider";

const Post = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.app.user);
  const [likeError, setLikeError] = useState(null);
  const [likeLoading, setLikLoading] = useState(false);
  const [commentSlide, setCommentSlide] = useState(false);
  const postData = useFetchData("https://gitsta.onrender.com/api/v1/post/details/" + params.id, user);

  if (!postData.data) {
    return (
      <div className="flex justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  } else if (postData.data.sucess === false) {
    return (
      <div className="py-20 flex justify-center font-semibold text-red-500">
        <p>failer to fetch this post</p>
      </div>
    );
  }

  function callBack(data) {
    if (!data.data) {
      setLikLoading(false);
      setLikeError("somethong went wrong");
    } else {
      console.log(data);
      setLikLoading(false);
      dispatch(setUser(data.data));
    }
  }

  return (
    <>
      <div className="flex flex-col items-center p-2 pt-12">
        <div className="w-1/2 max-sm:w-full space-y-2">
          <div className="avatar w-full border-2 border-base-content rounded-xl border-opacity-10">
            <div className="w-full aspect-square rounded-xl">
              <img src={postData.data.data.image} />
            </div>
          </div>

          <div>
            <p className="font-semibold">{postData.data.data.text}</p>
            <div className="space-x-1">
              <span className="font-semibold text-xs bg-base-content p-1 bg-opacity-10 rounded-lg">
                {postData.data.data.likes.length}
              </span>
              <span className="font-semibold text-xs opacity-60">likes</span>
              <span className="font-semibold text-xs bg-base-content p-1 bg-opacity-10 rounded-lg">
                {postData.data.data.comments.length}
              </span>
              <span className="font-semibold text-xs opacity-60">comments</span>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex ">
              <div
                className="cursor-pointer flex justify-center items-center"
                onClick={() => {
                  setLikLoading(true);
                  makePostRequest(
                    "https://gitsta.onrender.com/api/v1/post/like/" + params.id,
                    {
                      uid: user._id,
                    },
                    callBack
                  );
                }}
              >
                {likeLoading ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill={user.likes.includes(params.id) ? "red" : "none"}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                )}
              </div>
              <div onClick={() => setCommentSlide(!commentSlide)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 13.4876 3.36093 14.891 4 16.1272L3 21L7.8728 20C9.10904 20.6391 10.5124 21 12 21Z"
                  />
                </svg>
              </div>
            </div>

            <div>
              <span className="font-semibold text-xs opacity-60">
                posted on{" "}
              </span>
              <span className="font-semibold text-xs bg-base-content p-1 px-2 bg-opacity-10 rounded-lg">
                {formatDateAndTime(postData.data.data.createdAt).date}
              </span>
            </div>
          </div>
          
        </div>
      </div>
      <PostComments postId={params.id} />
      <CommentSlider
        postId={params.id}
        commentSlide={commentSlide}
        setCommentSlide={setCommentSlide}
      />
    </>
  );
};

export default Post;
