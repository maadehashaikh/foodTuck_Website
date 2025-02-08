"use client";
import NormalNavBar from "@/app/components/General/NormalNavBar";
import React from "react";
import SignUp from "../components/Auth/SignUp";

const page = () => {
  return (
    <>
      <NormalNavBar />
      <SignUp />
    </>
  );
};

export default page;
