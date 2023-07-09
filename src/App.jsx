import React from "react";
import { Dashboard } from "./Containers";
import { Contributors, Home, NpmDetails, Packages } from "./Components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NpmData from "./Data/NpmData.json";

const App = () => {
  return (
    <div className="md:flex-row dark:bg-slate-950 flex flex-col min-h-screen duration-100 bg-gray-100">
      <BrowserRouter>
        <Dashboard />
        <div className="dark:text-white flex-grow p-4 duration-50">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/contributors" element={<Contributors />} />
            {NpmData.map((item) => (
              <Route
                key={item.id}
                path={`/${item.package}`}
                element={
                  <NpmDetails key={item.id} packageName={item.package} />
                }
              />
            ))}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
