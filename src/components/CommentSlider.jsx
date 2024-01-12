import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trimString } from "../utils/helper";
import { makePostRequest } from "../api/makePostRequest";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/appSlice";

const CommentSlider = ({ commentSlide, setCommentSlide, postId }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState(null);
  const [sendLoading, setSendLoading] = useState(false);
  const user = useSelector((store) => store.app.user);

  function commentReciver(data) {
    setSendLoading(false);
    if (!data.data) {
      return;
    } else if (data.sucess == false) {
      return;
    } else if (data.sucess == true) {
      dispatch(setUser(data.data));
      setCommentSlide(!commentSlide);
    }
  }

  return (
    <AnimatePresence>
      {commentSlide && (
        <>
          <motion.div
            onClick={() => setCommentSlide(!commentSlide)}
            className="bg-black fixed w-full h-screen bg-opacity-70  top-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          ></motion.div>

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "tween" }}
            className=" w-1/2 mx-auto max-sm:w-full p-2"
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
            }}
            onDragEnd={(e, { offset, velocity }) => {
              if (offset.y > 50 || velocity.y > 500) {
                setCommentSlide(!commentSlide);
              }
            }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
          >
            <div className="bg-base-100 rounded-3xl border-2 border-base-content border-opacity-40 flex flex-col items-center ">
              <div className="bg-base-content bg-opacity-25 w-[30%] m-2 rounded-full cursor-pointer h-2"></div>
              <div className="join w-full p-3 flex flex-row">
                <textarea
                  className="textarea textarea-bordered flex-grow rounded-3xl join-item bg-base-300"
                  placeholder="comment here"
                  onChange={(e) => setContent(trimString(e.target.value))}
                  //   onFocus={() => console.log("typing")}
                ></textarea>
                <div>
                  {sendLoading ? (
                    <div className="join-item border-1 border-opacity-20 border-base-content flex justify-center items-center p-4 rounded-3xl h-full bg-base-300">
                      <span className="loading loading-spinner loading-sm"></span>
                    </div>
                  ) : (
                    <button
                      disabled={content ? false : true}
                      className="btn join-item border-1 border-opacity-20 border-base-content  rounded-3xl h-full bg-base-300"
                      onClick={() => {
                        setSendLoading(true);
                        makePostRequest(
                          "https://gitsta.onrender.com/api/v1/comment/send",
                          {
                            uid: user._id,
                            postid: postId,
                            content: content,
                          },
                          commentReciver
                        );
                      }}
                    >
                      send
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommentSlider;
