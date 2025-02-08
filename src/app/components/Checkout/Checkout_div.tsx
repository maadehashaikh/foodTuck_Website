import React from "react";
import NormalNavBar from "../General/NormalNavBar";
import PageName from "../General/PageName";
import Checkout_Comp from "./Checkout_Comp";

const Checkout_div = () => {
  return (
    <>
      <NormalNavBar />
      <PageName pageName="Checkout" title="Checkout Page" />
      <Checkout_Comp />
    </>
  );
};

export default Checkout_div;
