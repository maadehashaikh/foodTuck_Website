import React from "react";
import Latest_Blogs from "./LatestBlog";
import NormalNavBar from "../components/General/NormalNavBar";
import PageName from "../components/General/PageName";
import RightSide from "./RightSide";

const page = () => {
  return (
    <>
      <NormalNavBar />
      <PageName title="Blog List" pageName="Blog" />
      <div className="flex gap-10">
        <div className="w-[60%]">
          <Latest_Blogs />
        </div>
        <div className="w-[20%]">
          <RightSide />
        </div>
      </div>
    </>
  );
};

export default page;
