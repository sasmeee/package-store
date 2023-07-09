import React from "react";
import GithubData from "./GithubData";
import GitData from "../Data/GithubData.json";

const Contributors = () => {
  return (
    <div className="flex flex-col gap-6">
      <p className="mx-5 my-3 text-2xl font-bold text-blue-500">Contributors</p>
      <div className="md:grid-cols-2 lg:grid-cols-3 grid grid-cols-1 gap-5">
        {GitData.map((user) => (
          <GithubData key={user.user_id} userName={user.username} />
        ))}
      </div>
    </div>
  );
};

export default Contributors;
