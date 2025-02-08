"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Alamin Hasan",
    role: "Food Specialist",
    image: "/Feedback 1.png",
    quote:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam pellentesque bibendum non dui volutpat fringilla bibendum. Urna, elit augue urna, vitae feugiat pretium donec id elementum. Ultrices mattis sed vitae mus risus. Lacus nisi, et ac dapibus sit eu velit in consequat.vitae feugiat pretium donec id elementum esse cillum dolore eu fugiat nulla pariatur.",
    rating: 4,
  },
  {
    id: 2,
    name: "Fatima Raza",
    role: "Nutrition Expert",
    image: "/Feedback 2.jpg",
    quote:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Duis aute irure, Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    rating: 5,
  },
  {
    id: 3,
    name: "Ali Khan",
    role: "Chef",
    image: "/Feedback 3.jpg",
    quote:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit.",
    rating: 3,
  },
  {
    id: 4,
    name: "Sara Jamil",
    role: "Food Blogger",
    image: "/Feedback 4.jpg",
    quote:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    rating: 4,
  },
  {
    id: 5,
    name: "Rehan Ahmed",
    role: "Restaurant Owner",
    image: "/Feedback 5.jpg",
    quote:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    rating: 5,
  },
];

const Client_Feedback: React.FC = () => {
  return (
    <section className="bg-black text-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-amber-500 text-3xl font-serif mb-2">
          Testimonials
        </h2>
        <h3 className="text-4xl font-bold mb-12">
          What our clients are saying
        </h3>

        {/* Swiper Component */}
        <Swiper
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="mySwiper bg-white w-[60%] rounded-lg"
        >
          {testimonials.map((testimonial: Testimonial) => (
            <SwiperSlide key={testimonial?.id}>
              <div className="flex flex-col gap-3 items-center justify-between mx-auto mt-4 bg-white text-black lg:w-[80%] ">
                <Image
                  src={testimonial?.image}
                  alt={`${testimonial?.name} Feedback`}
                  width={80}
                  height={30}
                  className="rounded-full border-4 border-white bg-teal-300 m-auto mt-2"
                />

                <p className="text-gray-600 mb-6 mt-4 text-sm">
                  {testimonial?.quote}
                </p>
                <div className="flex justify-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-6 h-6 ${
                        i < testimonial?.rating
                          ? "text-amber-500"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <h4 className="font-bold text-xl">{testimonial?.name}</h4>
                <p className="text-gray-500 mb-3">{testimonial?.role}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Client_Feedback;
