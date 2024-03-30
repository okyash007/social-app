import React, { useState } from "react";
import { useFetchData2 } from "../api/useFetchData2";
import UserCard from "../components/UserCard";
import { backendDomain } from "../utils/constants";

const SearchPage = () => {
  const [searchText, setSearchText] = useState("");
  const [searchUser, setSearchUser] = useState(null);
  console.log(searchUser);

  useFetchData2(
    `${backendDomain}/api/v1/user/search?search=${searchText}`,
    searchText,
    searchUserReciver
  );

  function searchUserReciver(data) {
    if (data.sucess == true) {
      setSearchUser(data.data);
    }
    if (data.sucess == false) {
      setSearchUser([])
    }
  }

  return (
    <div className="pt-14 flex flex-col items-center">
      <div className="w-1/2 max-sm:w-full p-2">
        <div className="join w-full pt-2 flex flex-row">
          <input
            className="input input-bordered flex-grow rounded-xl join-item bg-base-300"
            placeholder="reply here"
            onChange={(e) => setSearchText(e.target.value)}
          ></input>
          <div>
            <button
              disabled={searchText.length > 0 ? false : true}
              className="btn join-item border-1 border-opacity-20 border-base-content  rounded-xl h-full bg-base-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="25"
                height="25"
                viewBox="0 0 50 50"
                stroke="currentColor"
                fill="currentColor"
              >
                <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
              </svg>
            </button>
          </div>
        </div>
        {searchUser && (
          <div className="py-2 space-y-2">
            {searchUser.map((m) => (
              <UserCard
                avatar={m.avatar}
                fullname={m.fullname}
                username={m.username}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
