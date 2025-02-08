"use client";
import React, { useEffect, useState, FC } from "react";
import { createClient } from "next-sanity";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaPinterest } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import Image from "next/image";

interface BlogData {
  _id: string;
  title: string;
  description?: string;
  author?: string;
  date: string;
  image: {
    asset: {
      url: string;
    };
  };
}

const client = createClient({
  projectId: "2sz91eg7",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

const Footer: FC = () => {
  const [blogdata, setBlogdata] = useState<BlogData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const BlogData: BlogData[] = await client.fetch(`
          *[_type == "blog"] | order(date desc) [0...3] {
            _id,
            title,
            description,
            author,
            date,
            image {
              asset->{
                url
              }
            }
          }
        `);

        setBlogdata(BlogData);
      } catch (error) {
        console.error("Error fetching BlogData:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <>
      <footer className="bg-black text-gray-300 pt-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Top Newsletter Section */}
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2 text-white">
              <span className="text-amber-500">Still</span> You Need Our Support?
            </h2>
            <p className="text-gray-400 mb-4">
              Dont wait! Make a smart & logical quote here. Its pretty easy.
            </p>
            <form className="flex flex-col md:flex-row justify-center items-center gap-3">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="w-full md:w-1/3 px-4 py-2 rounded-md focus:outline-none text-black"
              />
              <button
                type="submit"
                className="bg-amber-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md transition-all"
              >
                Subscribe Now
              </button>
            </form>
          </div>
          <hr className="border-gray-700 mb-8" />

          {/* Footer Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-sm pr-10 ">
            {/* About Us */}
            <div>
              <h3 className="text-white font-semibold mb-3">About Us.</h3>
              <p className="text-gray-400 leading-relaxed">
                Corporate clients and leisure travelers rely on Groundlink for
                dependable, safe, and professional chauffeur service across
                major cities worldwide.
              </p>
              <div className="flex items-center justify-evenly">
                <div className="bg-amber-500 px-5 py-3 text-xl text-white rounded-sm">
                  <IoMdTime />
                </div>
                <div>
                  <div className="mt-4">
                    <span className="block text-amber-500 font-semibold">
                      Opening Hours
                    </span>
                    <p>Mon - Sat (8.00 - 6.00)</p>
                    <p>Sunday - Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Useful Links */}
            <div>
              <h3 className="text-white font-semibold mb-3">Useful Links</h3>
              <ul className="space-y-1">
                {["About", "News", "Partners", "Team", "Menu", "Contacts"].map(
                  (link: string) => (
                    <li key={link}>
                      <a href="#" className="hover:text-orange-500 py-4">
                        {link}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Help Section */}
            <div>
              <h3 className="text-white font-semibold mb-3">Help?</h3>
              <ul className="space-y-2">
                {[
                  "FAQ",
                  "Term & Conditions",
                  "Reporting",
                  "Documentation",
                  "Support Policy",
                  "Privacy",
                ].map((item: string) => (
                  <li key={item}>
                    <a href="#" className="hover:text-amber-500">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recent Posts */}
            <div className="ml-[-45px]">
              <h3 className="text-white font-semibold mb-3">Recent Post</h3>
              {loading ? (
                <div className="text-center text-amber-500 text-lg">
                  <p>Fetching data from API...</p>
                  <div className="spinner-border animate-spin inline-block border-4 border-t-4 border-amber-500 rounded-full"></div>{" "}
                </div>
              ) : (
                <div className="">
                  {blogdata.length > 0 ? (
                    blogdata.map((post: BlogData) => (
                      <div
                        key={post._id}
                        className="rounded-lg overflow-hidden w-[300px] flex items-center justify-between mb-2"
                      >
                        <div className="w-[20%] bg-slate-300">
                          <Image
                            src={post.image.asset.url}
                            alt={post.title}
                            width={120}
                            height={100}
                            className="object-cover"
                          />
                        </div>

                        <div className="w-[80%] px-2 flex flex-col items-start justify-around ml-2">
                          <p className="text-gray-500 text-sm mb-1">
                            {new Date(post.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                          <h4 className="text-sm text-white">{post.title}</h4>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-400">
                      No blog posts available.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 flex flex-col md:flex-row justify-evenly items-start text-white text-sm bg-gray-500 w-full pt-2">
          <p className="text-center md:text-left mb-0">
            Copyright &copy; 2022 by Maadeha Shaikh. All Rights Reserved.
          </p>
          <div className="flex items-center justify-between gap-5">
            <FaFacebook />
            <FaTwitter />
            <FaInstagram />
            <FaYoutube />
            <FaPinterest />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
