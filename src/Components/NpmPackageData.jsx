import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const NpmPackageData = ({
  packageName,
  packageIcon,
  packageType,
  packageTitleName,
}) => {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await axios.get(
          `https://registry.npmjs.org/${packageName}`
        );
        const packageData = response.data;

        setPackages([packageData]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching package:", error);
      }
    };

    fetchPackage();
  }, [packageName]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dark:bg-slate-900 flex flex-col gap-5 p-5 overflow-hidden duration-100 bg-white rounded-lg shadow-lg select-none">
      <div className="whitespace-nowrap flex items-center gap-3 text-lg">
        <img
          className="md:w-24 md:h-24 w-16 h-16 rounded-full"
          src={
            packageIcon
              ? packageIcon
              : "https://avatars.githubusercontent.com/u/6078720?s=200&v=4"
          }
          alt="Package Icon"
        />
        <div className="lg:flex-row md:gap-2 whitespace-nowrap flex flex-col gap-2">
          <p className="font-semibold tracking-wider">{packageTitleName}</p>
          <p className="w-fit px-2 text-base font-semibold tracking-wider text-center text-white bg-green-400 rounded">
            {packageType}
          </p>
        </div>
      </div>
      <div>
        {packages.map((pkg) => (
          <div key={pkg.name} className="flex flex-col gap-4">
            <div className="leading-6">
              <p>{pkg.name}</p>
              <p>Version: {pkg["dist-tags"].latest}</p>
              <p>{pkg.description}</p>
            </div>
            <div className="flex items-center justify-between">
              <figcaption className="font-medium">
                <p className="text-sky-500 dark:text-sky-400 duration-100">
                  {pkg.author && pkg.author.name}
                </p>
              </figcaption>
              <Link to={`/${packageName}`}>Visit Package</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NpmPackageData;
