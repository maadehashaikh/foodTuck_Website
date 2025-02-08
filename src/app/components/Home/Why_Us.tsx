import React from "react";
import Image from "next/image";
import { PiHamburgerFill } from "react-icons/pi";
import { FaPizzaSlice, FaWineGlass } from "react-icons/fa";
const Why_Us = () => {
  return (
    <>
      <section className="bg-black text-white pt-16 h-[120vh] px-6 md:px-12">
        {/* Food Category */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2">
          {/* Left  Section */}
          <div className="grid grid-cols-2 grid-rows-3 gap-4">
            <Image
              src="/tacos.png"
              alt="Tacos"
              width={362}
              height={340}
              className="rounded-md object-cover row-span-2"
            />
            <Image
              src="/burger(chosse).png"
              alt="Burger"
              width={281}
              height={150}
              className="rounded-md object-cover mt-12"
            />
            <Image
              src="/broast.png"
              alt="Broast"
              width={230}
              height={300}
              className="row-span-3 rounded-md object-cover -ml-80 bg-red-600"
            />
            <Image
              src="/cheesy burger.png"
              alt="Cheesy Loaded Burger"
              width={244}
              height={230}
              className="rounded-md object-cover -mt-[290px] ml-60 bg-orange-500"
            />
            <Image
              src="/fries.png"
              alt="Fries"
              width={141}
              height={135}
              className="rounded-lg object-cover -mt-[585px] ml-[490px] bg-green-500"
            />
            <Image
              src="/brocliSalid.png"
              alt="Brocli Salid"
              width={141}
              height={135}
              className="rounded-lg object-cover -mt-[445px] ml-[490px] bg-fuchsia-400"
            />
          </div>
          {/* Right Text Content */}
          <div className="h-auto text-center lg:text-left lg:ml-28 md:ml-[800px]">
            <p className="text-amber-500 italic text-2xl mb-2">Why Choose us</p>
            <h2 className="text-4xl lg:text-4xl font-bold mb-4">
              <span className="text-amber-500">Ex</span>tra ordinary taste And
              Experienced
            </h2>
            <p className="text-gray-300  text-md mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              diam pellentesque bibendum non dui volutpat fringilla bibendum.
              Urna, elit augue urna, vitae feugiat pretium donec id elementum.
              Urna, elit augue urna, vitae feugiat pretium donec id elementum.
            </p>
            {/* Service Categories */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6 ">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-amber-500 text-white flex items-center justify-center rounded-lg">
                  <PiHamburgerFill className="w-14 h-14" />
                  <i className="PiHamburgerFill text-2xl"></i>
                </div>
                <p className="mt-2 text-gray-300">Fast Food</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-amber-500 text-white flex items-center justify-center rounded-lg">
                  <FaPizzaSlice className="w-14 h-14" />
                  <i className="FaPizzaSlice text-2xl"></i>
                </div>
                <p className="mt-2 text-gray-300">Lunch</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-amber-500 text-white flex items-center justify-center rounded-lg">
                  <FaWineGlass className="w-14 h-14" />
                  <i className="FaWineGlass text-2xl"></i>
                </div>
                <p className="mt-2 text-gray-300">Dinner</p>
              </div>
            </div>

            {/* Experience Section */}
            <div className="flex items-center justify-center lg:justify-start">
              <div className="bg-amber-500 text-gray-900 pr-4 h-[76.6px] py-3 rounded-l-md font-bold text-3xl"></div>
              <div className="bg-white text-black px-6 rounded-r-md text-lg flex gap-5 py-2">
                <div>
                  <span className="text-6xl text-amber-500">30+</span>
                </div>
                <div>
                  Years of <br />
                  <span className="text-black text-2xl font-semibold">
                    Experienced
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Why_Us;
