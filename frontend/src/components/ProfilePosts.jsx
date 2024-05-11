import React from "react";
import { Link } from "react-router-dom";

const ProfilePosts = ({ posts }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {posts.map((m) => (
        <Link className="" to={"/post/" + m._id} key={m._id}>
          <div className="avatar border-2 border-base-content rounded-xl border-opacity-10">
            <div className="w-36 rounded-xl">
              <img src={m.image} />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProfilePosts;
