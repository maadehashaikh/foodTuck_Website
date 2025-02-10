import React from "react";
import FoodDetail from "./FoodDetail";
import NormalNavBar from "@/app/components/General/NormalNavBar";

const FoodItem: React.FC = () => {
  return (
    <div>
      <NormalNavBar />
      <FoodDetail />
    </div>
  );
};

export default FoodItem;
