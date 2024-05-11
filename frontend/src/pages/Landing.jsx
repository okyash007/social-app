import React from "react";
import { makePostRequest } from "../api/makePostRequest";
import linkedInLogo from "../assets/linkedin.svg";
import githubLogo from "../assets/github.svg";

const Landing = () => {
  return (
    // <div className="w-full h-screen">

    //     <video autoPlay playsInline loop muted className=" h-full w-full ">
    //       <source
    //         src="https://tactusmarketing.com/wp-content/uploads/tactus-waves-hero.mp4"
    //         type="video/mp4"
    //       />
    //       <source
    //         src="https://tactusmarketing.com/wp-content/uploads/tactus-waves-hero.mp4"
    //         type="video/mp4"
    //       />

    //     </video>

    // </div>
    <>
      <div className="video-container">
        <video autoPlay playsInline loop muted id="myVideo">
          <source
            src="https://tactusmarketing.com/wp-content/uploads/tactus-waves-hero.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="content z-10 pt-12 h-full flex flex-col p-2 items-center">
          {/* <div className="backdrop-blur-sm w-1/2 max-sm:w-full bottom-0 bg-base-300 bg-opacity-20 aspect-square"></div> */}
        </div>
        <div className="absolute top-0 w-full h-full overflow-y-scroll scroll-bar">
          <div className="h-2/3"> eqnjkl</div>
          <div className="h-1/3 p-4 flex ">
            <div className="flex-grow flex  flex-col py-4 items-end justify-end">
              <button
                onClick={() =>
                  document.getElementById("my_modal_2").showModal()
                }
                className="btn w-fit bg-black bg-opacity-15 backdrop-blur-lg border-2 border-white border-opacity-10 text-white"
              >
                get started
              </button>
              <h1 className="text-9xl max-sm:text-7xl drop-shadow-md text-white font-extrabold w-fit">
                gitsta
              </h1>
            </div>
          </div>
          <div className="min-h-1/3 flex ">
            <div className=" bg-black bg-opacity-60 flex-grow backdrop-blur-sm p-6 flex gap-2 flex-row">
              <div className="flex-grow space-y-2">
                <p className="text-xs text-white">
                  No © copyright issues use it where ever you want
                </p>
                <div className="divider divider-vertical"></div>
                <div>
                  <p className="text-xs text-white">Socials</p>
                  <div className="flex gap-1 my-1">
                    <img src={linkedInLogo} width={20} alt="" />
                    <img src={githubLogo} width={20} alt="" />
                  </div>
                </div>
                <div>
                  <span className="text-xs text-white">
                    source code is here
                  </span>{" "}
                  <span className="text-xs text-white hover:underline cursor-pointer">
                    @okyash007
                  </span>
                </div>
                <div>
                  <p className="text-xs text-white">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
