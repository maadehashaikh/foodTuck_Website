import React from "react";
import Image from "next/image";
import Link from "next/link";

const About: React.FC = () => {
  return (
    <>
      <section className="bg-black text-white px-4 sm:px-8 lg:px-16 py-12 lg:py-24">
        {/* About Us Section */}
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
          {/* Left Section */}
          <div className="flex-1 text-center lg:text-left max-w-[90%]">
            <p className="text-amber-500 italic text-2xl mb-2">About us</p>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              We <span className="text-amber-500">Create</span> the best foody
              product
            </h2>
            <p className="text-gray-300 mb-6 text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              diam pellentesque bibendum non dui volutpat fringilla bibendum.
            </p>
            <ul className="space-y-2 text-gray-300 mb-6 text-lg">
              <li className="flex items-start gap-2">
                <span className="text-white font-bold">&#10003;</span> Lacus
                nisi, et ac dapibus sit eu velit in consequat.
              </li>
              <li className="flex items-start gap-3 text-lg">
                <span className="text-white font-bold">&#10003;</span> Quisque
                diam pellentesque bibendum non dui volutpat fringilla.
              </li>
              <li className="flex items-start gap-3 text-lg">
                <span className="text-white font-bold">&#10003;</span> Lorem
                ipsum dolor sit amet, consectetur adipiscing elit.
              </li>
            </ul>
            <Link
              href="/about"
              className="inline-block bg-amber-500 text-gray-600 px-12 py-3 rounded-full font-medium hover:bg-yellow-500 transition duration-300"
            >
              Read More
            </Link>
          </div>

          {/* Right Image Section */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="md:col-span-2">
              <Image
                src="/eggs.png"
                alt="Food Item 1"
                width={660}
                height={330}
                className="rounded-lg object-cover w-full"
                priority
              />
            </div>
            <Image
              src="/sauce.png"
              alt="Food Item 2"
              width={350}
              height={194}
              className="rounded-lg object-cover w-full"
            />
            <Image
              src="/bread.png"
              alt="Food Item 3"
              width={350}
              height={194}
              className="rounded-lg object-cover w-full"
            />
          </div>
        </div>

        {/* Food Category Section */}
        <div className="mt-16 text-center max-w-screen-lg mx-auto">
          <p className="text-yellow-400 italic text-lg">Food Category</p>
          <h2 className="text-4xl font-bold mb-8">
            Choose <span className="text-yellow-400">Food Item</span>
          </h2>

          {/* Food Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/salid.png"
                alt="Salid"
                width={430}
                height={329}
                className="object-cover w-full"
              />
              <div className="absolute top-2 left-2 bg-amber-500 text-gray-600 px-2 py-1 text-sm font-semibold rounded">
                Save 30%
              </div>
            </div>
            {/* Card 2 */}
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/burger.png"
                alt="Burger"
                width={430}
                height={329}
                className="object-cover w-full"
              />
            </div>
            {/* Card 3 */}
            <div className="rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/fruit salid.png"
                alt="Fruit Salad"
                width={430}
                height={329}
                className="object-cover w-full"
              />
            </div>
            {/* Card 4 */}
            <div className="rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/donuts.png"
                alt="Donuts"
                width={430}
                height={329}
                className="object-cover w-full"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
