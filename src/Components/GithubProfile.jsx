import React, { useEffect, useState } from "react";
import axios from "axios";

const GithubProfile = ({ name }) => {
  const [gitPic, setGitPic] = useState("");

  const fetchGit = async () => {
    const res = await axios.get(`https://api.github.com/users/${name}`);
    setGitPic(res.data);
  };

  useEffect(() => {
    fetchGit();
  }, [name]);

  return (
    <div>
      {gitPic ? (
        <img
          className="w-16 mx-auto rounded-full"
          src={gitPic.avatar_url}
          alt="Avatar"
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default GithubProfile;
