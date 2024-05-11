import React from "react";
import { useFetchData } from "../api/useFetchData";
import { formatDateAndTime } from "../utils/helper";

const GithubRepos = ({ username }) => {
  const githubData = useFetchData(
    `https://api.github.com/users/${username}/repos`
  );
  

  if (!githubData) {
    return (
      <div className="flex justify-center my-2">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  } else if (
    githubData.data === null ||
    githubData.data.message === "Not Found"
  ) {
    return (
      <div className="flex justify-center my-2">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }
  const repo = githubData.data;

  return (
    <>
      <div className=" gap-2 flex flex-wrap my-2">
        {repo.map((m) => (
          <div
            key={m.id}
            className="border-2 border-base-content flex-grow border-opacity-10 rounded-xl p-3 bg-base-300 hover:bg-base-content hover:bg-opacity-5 active:bg-neutral active:bg-opacity-35 transition-all "
          >
            <div className="">
              <h1 className="text-2xl font-extrabold max-sm:text-xl">
                {m.name}
              </h1>
              <div className="flex flex-wrap space-x-2">
                <div className="space-x-1">
                  <span className="text-xs font-semibold opacity-60">
                    creted on
                  </span>
                  <span className="bg-base-content bg-opacity-15 text-xs p-1 px-2 rounded-xl font-semibold">
                    {formatDateAndTime(m.created_at).date}{" "}
                  </span>
                </div>

                {formatDateAndTime(m.created_at).date !==
                  formatDateAndTime(m.updated_at).date && (
                  <div className="space-x-1">
                    <span className="text-xs font-semibold opacity-60">
                      latest commit
                    </span>
                    <span className="bg-base-content bg-opacity-15 text-xs p-1 px-2 rounded-xl font-semibold">
                      {formatDateAndTime(m.updated_at).date}{" "}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default GithubRepos;
