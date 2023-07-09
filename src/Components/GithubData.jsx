import axios from "axios";
import React, { useEffect, useState } from "react";
import { LuUsers } from "react-icons/lu";

const GithubData = ({ userName }) => {
  const [githubData, setGithubData] = useState(null);

  const fetchGithubData = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${userName}`
      );
      setGithubData(response.data);
    } catch (error) {
      console.error("Error fetching GitHub data:", error);
    }
  };

  useEffect(() => {
    fetchGithubData();
  }, [userName]);

  return (
    <div className="dark:bg-slate-900 flex flex-col gap-5 p-5 overflow-hidden duration-100 bg-white rounded-lg shadow-lg select-none">
      {githubData ? (
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            <img
              className="w-24 h-24 mx-auto rounded-full"
              src={githubData.avatar_url}
              alt="Avatar"
            />
            <p className="font-bold tracking-wider text-center"> {githubData.name} </p>
            <p className="text-center" >{githubData.bio}</p>
          </div>
          <div className="whitespace-nowrap flex items-center justify-center gap-2">
            <LuUsers />
            <p>{githubData.followers} Followers</p>
            <p>•</p>
            <p>{githubData.following} Following</p>
          </div>
          <div className="flex items-center justify-center">
            <a
              href={githubData.html_url}
              className="w-fit px-3 text-center text-white bg-blue-500 rounded"
            >
              Visit profile
            </a>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default GithubData;
