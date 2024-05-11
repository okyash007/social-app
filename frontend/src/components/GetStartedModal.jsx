import React, { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import { AnimatePresence, motion } from "framer-motion";

const GetStartedModal = ({ signIn }) => {
  const [isSignIn, setIsSignIn] = useState(signIn ? true : false);

  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn border-2 border-base-content border-opacity-10 bg-base-300"
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        Sign In
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box mr-4 flex flex-col max-w-96">
          <AnimatePresence mode="wait">
            <motion.div
              key={isSignIn ? 1 : 2}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isSignIn ? <SignIn /> : <SignUp />}
            </motion.div>
          </AnimatePresence>

          <div>
            <span className="text-xs">
              {isSignIn
                ? "don't have a account then "
                : "already have a account ? "}
            </span>
            <span
              className="hover:underline cursor-pointer"
              onClick={() => setIsSignIn(!isSignIn)}
            >
              {isSignIn ? "Create one" : "login"}
            </span>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default GetStartedModal;
