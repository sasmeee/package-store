import React, { useEffect, useState } from "react";
import {
  TbBrandBaidu,
  TbHome,
  TbPackage,
  TbTerminal2,
  TbX,
} from "react-icons/tb";
import { Link } from "react-router-dom";

const PopupNavbar = ({ visible, onClose }) => {
  const handleOnClose = (e) => {
    if (e.target.id === "popupmenu") onClose();
  };

  if (!visible) return null;

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "system");
  const element = document.documentElement;
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

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
    <div
      onClick={handleOnClose}
      id="popupmenu"
      className="bg-opacity-10 backdrop-blur-sm md:hidden absolute inset-0 flex items-start justify-center bg-gray-500"
    >
      <div className="dark:text-gray-100 dark:bg-slate-900 flex flex-col gap-5 px-3 py-2 mt-20 duration-100 bg-white rounded-lg">
        <div className="gap-14 flex items-center justify-between">
          <div className="flex items-center justify-start gap-2 text-xl">
            <TbTerminal2 className="dark:text-blue-500 text-2xl duration-100" />
            <p className="whitespace-nowrap">Package Store</p>
          </div>
          <TbX className="text-xl" onClick={onClose} />
        </div>
        <div className="flex flex-col gap-3">
          <Link to="/">
            <div
              className="dark:text-gray-100 flex items-center justify-start gap-2 text-lg text-gray-900 duration-100"
              onClick={onClose}
            >
              <TbHome className="dark:text-blue-500 text-2xl duration-100" />{" "}
              <p>Home</p>
            </div>
          </Link>
          <Link to="/packages">
            <div
              className="dark:text-gray-100 flex items-center justify-start gap-2 text-lg text-gray-900 duration-100"
              onClick={onClose}
            >
              <TbPackage className="dark:text-blue-500 text-2xl duration-100" />{" "}
              <p>Packages</p>
            </div>
          </Link>
          <Link to="/contributors">
            <div
              className="dark:text-gray-100 flex items-center justify-start gap-2 text-lg text-gray-900 duration-100"
              onClick={onClose}
            >
              <TbBrandBaidu className="dark:text-blue-500 text-2xl duration-100" />{" "}
              <p>Contributors</p>
            </div>
          </Link>
        </div>
        <div className="dark:text-gray-500 duration-100">
          {options?.map((opt) => (
            <button
              key={opt.text}
              onClick={() => handleThemeChange(opt.text)}
              className={`w-8 h-8 text-2xl leading-9 rounded-full ${
                theme === opt.text && `text-blue-500`
              }`}
            >
              <ion-icon name={opt.icon}></ion-icon>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopupNavbar;
