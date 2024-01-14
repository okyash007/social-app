import { useState } from "react";
import { useFetchData2 } from "../api/useFetchData2";
import FeedPosts from "../components/FeedPosts";
import FeedProfiles from "../components/FeedProfiles";
import FollowingPosts from "../components/FollowingPosts";

const Home = () => {
  const [feed, setFeed] = useState(true);

  return (
    <div className=" h-screen flex space-x-2 flex-row justify-center">
      <div className="w-1/2 max-sm:w-full pt-16 p-2 flex flex-col">
        <div role="tablist" className="tabs bg-base-100 py-2 tabs-boxed">
          <a
            role="tab"
            onClick={() => setFeed(true)}
            className={
              feed
                ? "tab tab-active font-extrabold transition-all"
                : "tab font-extrabold transition-all hover:bg-base-content hover:bg-opacity-20"
            }
          >
            feed
          </a>
          <a
            role="tab"
            onClick={() => setFeed(false)}
            className={
              !feed
                ? "tab tab-active font-extrabold transition-all"
                : "tab font-extrabold transition-all hover:bg-base-content hover:bg-opacity-20"
            }
          >
            following
          </a>
        </div>
        <div className="overflow-y-scroll scroll-bar border-t-2 pt-2 border-opacity-20 border-base-content">
          {feed ? <FeedPosts /> : <FollowingPosts />}
        </div>
      </div>
      <FeedProfiles />
    </div>
  );
};

export default Home;
