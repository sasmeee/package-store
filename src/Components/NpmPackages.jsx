import React from "react";
import NpmPackageData from "./NpmPackageData";
import NpmData from "../Data/NpmData.json";

const NpmPackages = () => {
  return (
    <div className="flex flex-col gap-6">
      <p className="mx-5 my-3 text-2xl font-bold text-blue-500">
        Stored Packages
      </p>
      <div className="md:grid-cols-2 lg:grid-cols-3 grid grid-cols-1 gap-5">
        {NpmData.map((item) => (
          <NpmPackageData
            key={item.id}
            packageTitleName={item.package_name}
            packageType={item.type}
            packageIcon={item.image}
            packageName={item.package}
          />
        ))}
      </div>
    </div>
  );
};

export default NpmPackages;
