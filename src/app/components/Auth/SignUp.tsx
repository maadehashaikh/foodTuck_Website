"use client";
import { useState } from "react";
import { FaGoogle, FaApple, FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };
  return (
    <div className="flex items-center justify-center min-h-screen">
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
          <button className="w-full bg-orange-500 text-white py-2 rounded-md font-semibold hover:bg-orange-600">
            Sign Up
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
    </div>
  );
};

export default SignUp;
