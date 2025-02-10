import React from "react";
import LandingPage from "./components/Home/LandingPage";
import Navbar from "./components/General/Navbar";

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <LandingPage />
    </>
  );
}
export default Home;

