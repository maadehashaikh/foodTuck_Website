"use client";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { FaGoogle, FaApple, FaEnvelope, FaLock, FaUser } from "react-icons/fa";

interface FormData {
  name: string;
  email: string;
  password: string;
  remember: boolean;
}

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignedIn>
        <div className="bg-orange-400 flex flex-col mx-auto px-8 py-2 rounded-lg">
          <div className="mx-auto text-2xl">
            <UserButton />
          </div>

          <div className="py-2">
            <h1 className="text-2xl font-bold">Welcome To FoodTuck 🍔🍟</h1>
            <p className="mt-1 text-base">
              Use Coupon
              <span className="text-lg text-white font-semibold px-2">
                SAVE20
              </span>
              to get a discount of 20%
            </p>
          </div>
        </div>
      </SignedIn>

      <SignedOut>
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex items-center border p-2 rounded-md">
              <FaUser className="text-gray-500 mr-2" />
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full outline-none"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4 flex items-center border p-2 rounded-md">
              <FaEnvelope className="text-gray-500 mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full outline-none"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4 flex items-center border p-2 rounded-md">
              <FaLock className="text-gray-500 mr-2" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full outline-none"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                className="mr-2"
              />
              <label className="text-gray-600">Remember me?</label>
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 rounded-md font-semibold hover:bg-orange-600"
            >
              <SignInButton mode="modal" />
            </button>
          </form>
          <p className="text-right text-sm text-gray-500 mt-2 cursor-pointer">
            Forgot password?
          </p>
          <div className="flex items-center my-4">
            <div className="flex-1 border-t"></div>
            <p className="px-2 text-gray-500">OR</p>
            <div className="flex-1 border-t"></div>
          </div>
          <button className="w-full flex items-center justify-center border py-2 rounded-md mb-2 hover:bg-gray-200">
            <FaGoogle className="mr-2 text-red-500" /> Sign up with Google
          </button>
          <button className="w-full flex items-center justify-center border py-2 rounded-md hover:bg-gray-200">
            <FaApple className="mr-2 text-black" /> Sign up with Apple
          </button>
        </div>
      </SignedOut>
    </div>
  );
};

export default SignIn;
