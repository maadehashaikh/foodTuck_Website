"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart, Search } from "lucide-react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <nav className="bg-black text-white py-4">
      <div className="w-full mx-auto px-4 text-center md:w-full">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <span className="text-amber-600">Food</span>
          <span className="text-white">tuck</span>
        </div>
      </div>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-amber-600">
            Home
          </Link>
          <Link href="/menu" className="hover:text-amber-600">
            Menu
          </Link>
          <Link href="/blog" className="hover:text-amber-600">
            Blog
          </Link>
          <Link href="/FAQ" className="hover:text-amber-600">
            Pages
          </Link>
          <Link href="/about" className="hover:text-amber-600">
            About
          </Link>
          <Link href="/shoplist" className="hover:text-amber-600">
            Shop
          </Link>
          <Link href="/contact" className="hover:text-amber-600">
            Contact
          </Link>
        </div>

        <div className="md:flex sm:w-[500px] sm:flex items-center space-x-4">
          <button className="lg:w-[200px] lg:ml-[200px] md:w-[150px] sm:w-[120px] md:ml-[100px] flex items-center justify-center border-amber-600 border-2 rounded-md px-2">
            <Search className="w-5 h-5 text-amber-600 md:mr-2" />
            <span className="md:inline sm:text-sm py-1 text-amber-600 font-semibold">
              Search
            </span>
          </button>
          <Link href="/cart" className="text-white hover:text-amber-500 ml-2">
            <ShoppingCart className="w-6 h-6 cursor-pointer" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-orange-500 hover:bg-gray-100"
            >
              Home
            </Link>
            <Link
              href="/Menu"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-orange-500 hover:bg-gray-100"
            >
              Menu
            </Link>

            <Link
              href="/blog"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-orange-500 hover:bg-gray-100"
            >
              Our Chefs
            </Link>
            <Link
              href="/FAQ"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-orange-500 hover:bg-gray-100"
            >
              Pages
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-orange-500 hover:bg-gray-100"
            >
              About
            </Link>
            <Link
              href="/shoplist"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-orange-500 hover:bg-gray-100"
            >
              Shop
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-orange-500 hover:bg-gray-100"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;
