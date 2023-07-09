import React, { useEffect, useState } from "react";
import {
  TbBrandBaidu,
  TbDotsVertical,
  TbHome,
  TbPackage,
  TbTerminal2,
} from "react-icons/tb";
import { Link } from "react-router-dom";
import PopupNavbar from "./PopupNavbar";

const Dashboard = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "system");
  const element = document.documentElement;
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const [showMenu, setShowMenu] = useState(false);
  const handleOnClose = () => setShowMenu(false);

  const options = [
    {
      icon: "sunny",
      text: "light",
    },
    {
      icon: "moon",
      text: "dark",
    },
    {
      icon: "desktop-outline",
      text: "system",
    },
  ];

  function onWindowMatch() {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && darkQuery.matches)
    ) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  }

  useEffect(() => {
    switch (theme) {
      case "dark":
        element.classList.add("dark");
        break;
      case "light":
        element.classList.remove("dark");
        break;
      default:
        localStorage.removeItem("theme");
        onWindowMatch();
        break;
    }
  }, [theme]);

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
  };

  darkQuery.addEventListener("change", (e) => {
    if (!("theme" in localStorage)) {
      if (e.matches) {
        element.classList.add("dark");
      } else {
        element.classList.remove("dark");
      }
    }
  });
  return (
    <div>
      <div className="md:flex dark:text-gray-100 dark:bg-slate-900 sticky top-0 bottom-0 left-0 flex-col justify-start hidden h-screen gap-10 duration-100 bg-gray-200">
        <Link to="/">
          <div className="flex items-center justify-start gap-2 px-8 py-6 text-lg text-white bg-blue-500">
            <TbTerminal2 />
            <p className="whitespace-nowrap">Package Store</p>
          </div>
        </Link>

        <div className=" flex flex-col h-full gap-3 text-base text-gray-800">
          <Link to="/">
            <div className="dark:text-gray-100 flex items-center justify-start gap-3 px-8 text-gray-900">
              <div className="dark:bg-slate-800 dark:text-blue-100 p-1 duration-100 rounded shadow">
                <TbHome className="text-lg duration-100" />
              </div>
              <p className="duration-100">Home</p>
            </div>
          </Link>
          <Link to="/packages">
            <div className="dark:text-gray-100 flex items-center justify-start gap-3 px-8 text-gray-900">
              <div className="dark:bg-slate-800 dark:text-blue-100 p-1 duration-100 rounded shadow">
                <TbPackage className="text-lg duration-100" />
              </div>
              <p className="duration-100">Packages</p>
            </div>
          </Link>
          <Link to="/contributors">
            <div className="dark:text-gray-100 flex items-center justify-start gap-3 px-8 text-gray-900">
              <div className="dark:bg-slate-800 dark:text-blue-100 p-1 duration-100 rounded shadow">
                <TbBrandBaidu className="text-lg duration-100" />
              </div>
              <p className="duration-100">Contributors</p>
            </div>
          </Link>
        </div>

        <div className="flex items-center justify-center mx-8 my-2">
          <div className="w-fit dark:text-gray-500 dark:bg-slate-800 flex items-center justify-center px-2 bg-white rounded-lg shadow">
            {options?.map((opt) => (
              <button
                key={opt.text}
                onClick={() => handleThemeChange(opt.text)}
                className={`w-8 h-8 text-xl leading-9 rounded-full ${
                  theme === opt.text && `text-blue-500`
                }`}
              >
                <ion-icon name={opt.icon}></ion-icon>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="dark:bg-slate-900 flex flex-col justify-center overflow-x-hidden duration-100 bg-gray-200">
        <div className="md:hidden flex items-center justify-between gap-2 mx-8 my-5">
          <Link to="/">
            <div className="flex items-center justify-start gap-2 text-lg">
              <TbTerminal2 className="text-2xl text-blue-500" />
              <p className="whitespace-nowrap dark:text-gray-100 text-xl font-semibold tracking-wider text-gray-800 duration-100">
                Package Store
              </p>
            </div>
          </Link>
          <TbDotsVertical
            onClick={() => setShowMenu(true)}
            className="text-slate-600 dark:text-slate-400 text-2xl font-light"
          />
        </div>
      </div>

      <PopupNavbar onClose={handleOnClose} visible={showMenu} />
    </div>
  );
};

export default Dashboard;
