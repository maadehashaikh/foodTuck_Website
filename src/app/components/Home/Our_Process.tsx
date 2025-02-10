import React from "react";
import { FaPlayCircle } from "react-icons/fa";

const Our_Process: React.FC = () => {
  return (
    <>
      <section className=" h-[90vh] text-white bg-black">
        <div className=" absolute mt-16 w-full h-auto">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-80"
            style={{
              backgroundImage: "url('/Our Process.png')",
            }}
          ></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start justify-between px-6 lg:px-16 py-12">
            <div className="hidden lg:block w-full lg:w-1/2"></div>

            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <p className="text-amber-500 italic text-lg mb-2">
                Restaurant Active Process
              </p>
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
                <span className="text-amber-500">We</span> Document Every Food
                <br />
                Bean Process until it is saved
              </h1>
              <p className="text-gray-300 mt-4 mb-6 leading-relaxed text-end">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Recusandae optio in ad eveniet consequatur minus totam ut,
                distinctio corrupti quis qui sit!
              </p>

              <div className="flex sm:flex-row justify-end lg:justify-end gap-4 font-semibold">
                <button className="px-8 py-2 border-2 border-amber-500 text-white rounded-ful transition duration-300 rounded-lg">
                  Read More
                </button>
                <button className="px-6 py-2 flex items-center gap-2  bg-transparent rounded-full  transition duration-300 text-white">
                  <div className="bg-amber-500 flex items-center justify-center  w-7 h-7 rounded-full ">
                    <FaPlayCircle />
                  </div>
                  <span>Play Video</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Our_Process;
