import React, { useEffect, useState } from "react";
import axios from "axios";

const NpmPackageDetails = ({ packageName }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [packageData, setPackageData] = useState({});

  useEffect(() => {
    fetchPackageData();
  }, []);

  const fetchPackageData = async () => {
    try {
      const response = await axios.get(
        `https://registry.npmjs.org/${packageName}`
      );
      setPackageData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const calculateDaysSincePublished = () => {
    const publishedDate = new Date(
      packageData.time[packageData["dist-tags"].latest]
    );
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - publishedDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysDifference;
  };

  const getGitHubLink = () => {
    if (packageData.repository && packageData.repository.url) {
      const repositoryUrl = packageData.repository.url;
      const githubUrl = repositoryUrl.replace("git+", "").replace(".git", "");
      return githubUrl;
    }
    return null;
  };

  const getGitHubProfileLink = () => {
    if (packageData.repository && packageData.repository.url) {
      const repositoryUrl = packageData.repository.url;
      const githubUsername = repositoryUrl.split("/").slice(-2, -1)[0];
      return `https://github.com/${githubUsername}`;
    }
    return null;
  };

  const getNpmPackageUrl = () => {
    if (packageData.name) {
      return `https://www.npmjs.com/package/${packageData.name}`;
    }
    return null;
  };

  return (
    <div className="flex flex-col gap-6">
      <p className="mx-5 my-3 text-2xl font-bold text-blue-500">
        Package Overview
      </p>
      <div className="dark:bg-slate-900 p-5 overflow-auto duration-100 bg-white rounded-lg shadow-lg">
        {isLoading ? (
          <div className="dark:text-gray-200 text-gray-600 duration-100">
            Loading...
          </div>
        ) : (
          <div>
            <div className="flex flex-col gap-3 mb-4">
              <p className="text-xl font-bold">{packageData.name}</p>
              <p className="dark:text-gray-200 text-gray-600 duration-100">
                {packageData.description}
              </p>
              <div className="flex items-center gap-3">
                <p className="dark:text-gray-200 text-gray-600 duration-100">
                  v {packageData["dist-tags"].latest}
                </p>
                <p className="dark:text-gray-200 text-gray-600 duration-100">
                  •
                </p>
                <p className="dark:text-gray-200 text-gray-600 duration-100">
                  Published {calculateDaysSincePublished()} days ago
                </p>
              </div>
              <p className="dark:text-gray-200 text-gray-600 duration-100">
                Coded by :{" "}
                <a
                  className="italic font-bold text-blue-500"
                  href={getGitHubProfileLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {packageData.author ? packageData.author.name : "Unknown"}
                </a>
              </p>
            </div>

            <div className="flex flex-col gap-3 mb-4">
              <p className="text-lg font-bold">Installation:</p>
              <pre className="dark:text-gray-200 text-gray-600 duration-100">
                <code>{`npm install ${packageData.name}`}</code>
              </pre>
            </div>
            <div className="flex flex-col gap-3 mb-4">
              <p className="text-lg font-bold">License:</p>
              <p className="dark:text-gray-200 text-gray-600 duration-100">
                {packageData.license}
              </p>
            </div>
            <div className="flex flex-col gap-3 mb-4">
              <p className="text-lg font-bold">Dependencies:</p>
              <ul>
                {packageData.versions &&
                  Object.values(packageData.versions).map((version) => (
                    <React.Fragment key={version.version}>
                      {version.dependencies &&
                        Object.entries(version.dependencies).map(
                          ([dependency, version]) => (
                            <li
                              key={dependency}
                              className="dark:text-gray-200 text-gray-600 duration-100"
                            >
                              {dependency}: {version}
                            </li>
                          )
                        )}
                    </React.Fragment>
                  ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3 mb-4">
              <p className="text-lg font-bold">Repository:</p>
              <p className="dark:text-gray-200 text-gray-600 duration-100">
                {getGitHubLink() ? getGitHubLink() : "Not available"}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="dark:bg-slate-900 p-5 overflow-auto duration-100 bg-white rounded-lg shadow-lg">
        {isLoading ? (
          <div className="dark:text-gray-200 text-gray-600 duration-100">
            Loading...
          </div>
        ) : (
          <div>
            <div className="flex flex-col gap-3 mb-4">
              <p className="text-lg font-bold">Keywords:</p>
              <ul className="flex gap-3">
                {packageData.keywords.map((keyword) => (
                  <li
                    key={keyword}
                    className="dark:text-gray-200 text-gray-600 duration-100"
                  >
                    {keyword}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3 mb-4">
              <p className="text-lg font-bold">More info:</p>
              <p className="dark:text-gray-200 text-gray-600 duration-100">
                <a
                  href={getNpmPackageUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {getNpmPackageUrl() ? getNpmPackageUrl() : "Not available"}
                </a>
              </p>
            </div>
            <div className="flex flex-col gap-3 mb-4">
              <p className="text-lg font-bold">Maintainers:</p>
              <ul>
                {packageData.maintainers.map((maintainer) => (
                  <li
                    key={maintainer.name}
                    className="dark:text-gray-200 text-gray-600 duration-100"
                  >
                    {maintainer.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NpmPackageDetails;
