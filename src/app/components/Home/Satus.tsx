import React from "react";
import Image from "next/image";

const Status: React.FC = () => {
  return (
    <div className="bg-black py-3">
      <div className="relative bg-black text-white">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: "url('/status Img.png')",
          }}
        ></div>

        <div className="relative z-10 py-12 ">
          <div className="container mx-auto px-4">
            {/* Flexbox for Icons & Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {/* Item 1 */}
              <div className="flex flex-col items-center gap-2">
                <Image
                  src="/Chefs.png"
                  alt="Professional Chefs"
                  width={120}
                  height={120}
                />
                <p className="text-lg font-semibold">Professional Chefs</p>
                <p className="text-3xl font-bold mt-2">20</p>
              </div>

              {/* Item 2 */}
              <div className="flex flex-col items-center gap-2">
                <Image
                  src="/Items of foods.png"
                  alt="Items of Food"
                  width={120}
                  height={120}
                />
                <p className="text-lg font-semibold">Items Of Food</p>
                <p className="text-3xl font-bold mt-2">30</p>
              </div>

              {/* Item 3 */}
              <div className="flex flex-col items-center gap-2">
                <Image
                  src="/Years of experience.png"
                  alt="Years Of Experience"
                  width={120}
                  height={120}
                />
                <p className="text-lg font-semibold">Years Of Experienced</p>
                <p className="text-3xl font-bold mt-2">30+</p>
              </div>

              {/* Item 4 */}
              <div className="flex flex-col items-center gap-2">
                <Image
                  src="/Customers.png"
                  alt="Happy Customers"
                  width={120}
                  height={120}
                />
                <p className="text-lg font-semibold">Happy Customers</p>
                <p className="text-3xl font-bold mt-2">220</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Status;
