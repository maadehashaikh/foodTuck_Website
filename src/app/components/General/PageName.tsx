import React from "react";
import { TbMathGreater } from "react-icons/tb";

const PageName = ({ pageName, title }) => {
  return (
    <>
      <div
        className="w-full h-[270px] flex flex-col items-center justify-center bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/pageNameBg.png')" }}
      >
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="text-base flex items-center justify-between gap-3">
          Home
          <TbMathGreater />
          <span className="text-orange-500 ">{pageName}</span>
        </p>
      </div>
    </>
  );
};

export default PageName;
