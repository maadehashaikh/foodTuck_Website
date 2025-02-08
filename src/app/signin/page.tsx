import React from "react";
import NormalNavBar from "../components/General/NormalNavBar";
import SignIn from "../components/Auth/SignIn";

const page: React.FC = () => {
  return (
    <>
      <NormalNavBar />
      <SignIn />
    </>
  );
};

export default page;
