import React from "react";
import Cart from "../components/Cart/Cart";
import NormalNavBar from "../components/General/NormalNavBar";
import PageName from "../components/General/PageName";

const page: React.FC = () => {
  return (
    <div>
      <NormalNavBar />
      <PageName pageName="Shopping cart" title="Shopping Cart" />
      <Cart />
    </div>
  );
};

export default page;
