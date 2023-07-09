import React from "react";
import GithubProfile from "./GithubProfile";
import GitData from "../Data/GithubData.json";

const Home = () => {
  return (
    <div className="md:my-0 md:px-10 flex flex-col items-center justify-center h-full gap-16 px-2 my-10 text-center select-none">
      <div className="md:py-10 md:px-6 flex flex-col gap-6 px-3 py-5 text-center">
        <p className="text-4xl font-bold text-blue-500">
          Explore APIs and Packages
        </p>
        <p className="text-lg">
          We offer a diverse selection of APIs and packages to elevate your
          development projects. Discover our wide range of resources designed to
          enhance your software solutions. Access our latest APIs and packages
          directly from our platform, ensuring you stay up-to-date with the most
          cutting-edge tools for your development needs.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-5">
        <p className="text-2xl font-bold text-blue-500">Contributors</p>
        <div className="flex items-center justify-center gap-3">
          {GitData.map((pics) => (
            <GithubProfile name={pics.username} key={pics.username} />
          ))}
        </div>
      </div>

      <div className="dark:text-gray-200 relative bottom-0 left-0 right-0 text-sm text-gray-600">
        Designed by :{" "}
        <a href="https://github.com/sasmeee" className="italic">
          Sasmitha Ashinsana
        </a>
      </div>
    </div>
  );
};

export default Home;
