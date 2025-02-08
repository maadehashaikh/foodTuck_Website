import React from "react";
import Image from "next/image";
import Link from "next/link";
import About from "./About";
import Why_Us from "./Why_Us";
import Client_Feedback from "./Client_Feedback";
import Chef from "./Chef";
import PickMenu from "./PickMenu";
import Our_Process from "./Our_Process";
import Latest_Blogs from "../Blog/Latest_Blogs";
import Status from "./Satus";

const LandingPage = () => {
  return (
    <>
      {/* Section 01 (Landing page)*/}
      <section
        id="one"
        className="bg-black text-white px-6 lg:px-16 py-8 lg:py-24 flex flex-col lg:flex-row items-center lg:items-start justify-between"
      >
        {/* Left Content */}
        <div className="text-center lg:text-left w-full md:max-w-xl space-y-6">
          <p className="text-amber-500 italic text-xl md:text-2xl">
            Its Quick & Amazing!
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
            <span className="text-amber-500">Th</span>e Art of Speed Food
            Quality
          </h1>
          <p className="text-gray-300 text-lg md:text-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed
            pharetra dolor necque massa congue.
          </p>
          <Link
            href="/menu"
            className="inline-block bg-amber-500 text-gray-600 px-10 py-3 sm:px-14 sm:py-4 rounded-full font-medium hover:bg-yellow-500 transition duration-300"
          >
            See Menu
          </Link>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 flex justify-center mt-10 md:mt-0 lg:ml-24">
          <Image src="/Plate.png" alt="Its a Plate" width={500} height={400} />
        </div>
      </section>

      {/* Section 02 (About Us)*/}
      <About />

      {/* Section 03 (Why Choose Us)*/}
      <Why_Us />

      {/* Section 04 (Status Section) */}
      <Status />

      {/* Section 05 (Status Section) */}
      <PickMenu />

      {/* Section 06 (Chef Section) */}
      <Chef />

      {/* Section 07 (Client Section) */}
      <Client_Feedback />

      {/* Section 08 (Our Process Section) */}
      <Our_Process />

      {/* Section 09 (Our Process Section) */}
      <Latest_Blogs />
    </>
  );
};

export default LandingPage;
