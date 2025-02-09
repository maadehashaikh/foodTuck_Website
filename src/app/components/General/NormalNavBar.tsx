import React from "react";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

const NormalNavBar = () => {
  return (
    <>
      <header className="bg-black shadow-md py-4">
        <div className="w-full max-w-screen-xl mx-auto flex items-center justify-between px-6">
          {/* Logo */}
          <div className="text-2xl font-bold text-white">
            <span className="text-amber-600">Food</span>
            <span className="text-white">tuck</span>
          </div>

          {/* Navigation Links  */}
          <nav className="flex space-x-6 text-white">
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
            {/* </div> */}
          </nav>

          {/* Button */}
          <button className="flex items-center justify-between py-2 px-4 rounded-lg text-white gap-3 w-auto">
            <FaSearch />
            <Link href="/signin">
              <FaUser />
            </Link>
            <Link href="/cart">
              <FaCartPlus />
            </Link>
          </button>
        </div>
      </header>
    </>
  );
};

export default NormalNavBar;
