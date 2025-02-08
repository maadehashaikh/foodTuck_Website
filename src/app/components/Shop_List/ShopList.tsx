import React from "react";
import NormalNavBar from "../General/NormalNavBar";
import PageName from "../General/PageName";
import ShopListItems from "./ShopListItems";

const ShopList: React.FC = () => {
  return (
    <>
      <NormalNavBar />
      <PageName pageName="Shop" title="Our Shop" />
      <ShopListItems />
    </>
  );
};

export default ShopList;
