import NormalNavBar from "@/app/components/General/NormalNavBar";
import React from "react";
import BlogDetail from "./BlogDetail";
import RightSide from "@/app/blog/RightSide";

const page: React.FC = () => {
  return (
    <>
      <NormalNavBar />
      <div className="flex gap-10 mt-10">
        <div className="w-[65%]">
          <BlogDetail />
        </div>
        <div className="w-[20%]">
          <RightSide />
        </div>
      </div>
    </>
  );
};

export default page;
