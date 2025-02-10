"use client";
import NormalNavBar from "@/app/components/General/NormalNavBar";
import React from "react";
import SignUp from "../components/Auth/SignUp";

const page: React.FC = () => {
  return (
    <>
      <NormalNavBar />
      <SignUp />
    </>
  );
};

export default page;
