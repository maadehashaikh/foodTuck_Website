"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { FaPinterestSquare } from "react-icons/fa";
import { createClient } from "next-sanity";
import { FaYoutube } from "react-icons/fa";

const client = createClient({
  projectId: "2sz91eg7",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

const RightSide = () => {
  const [search, setSearch] = useState("");
  const [blogdata, setBlogdata] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const BlogData = await client.fetch(`
              *[_type == "blog"] | order(date desc) [0...4] {
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
      <aside className="w-80 p-4 bg-white shadow-lg">
        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search Your Recipe..."
            className="w-full p-2 pl-4 pr-10 border border-gray-300 rounded-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-orange-500">
            <IoSearch size={20} />
          </button>
        </div>

        {/* Profile Section */}
        <div className="text-center mb-6 p-2 border-2 border-gray-200 rounded-lg">
          <Image
            src="/chef/chef-3.png"
            alt="Profile Picture"
            width={80}
            height={80}
            className="rounded-full mx-auto"
          />
          <h2 className="font-semibold text-lg mt-2">Prince Miyako</h2>
          <p className="text-gray-500 text-sm">Food Blogger | Chef</p>
          <p className="text-gray-400 text-xs px-4 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vitae
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vita.
          </p>
          <div className="flex justify-center space-x-3 mt-2 text-gray-500">
            <FaFacebookF /> <FaTwitter /> <FaInstagram />
            <FaPinterestSquare />
          </div>
        </div>

        {/* Recent Posts */}
        <div className="mb-6">
          <h3 className="text-black font-semibold mb-3">Recent Post</h3>
          {loading ? (
            <div className="text-center text-amber-500 text-lg">
              <p>Fetching data from API...</p>
              <div className="spinner-border animate-spin inline-block border-4 border-t-4 border-amber-500 rounded-full"></div>{" "}
            </div>
          ) : (
            <div className="">
              {blogdata.length > 0 ? (
                blogdata.map((post) => (
                  <div
                    key={post._id}
                    className=" rounded-lg overflow-hidden  w-[300px] flex items-center justify-between mb-2"
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
                      <h4 className="text-sm  text-white">{post.title}</h4>
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

        {/* Filter By Menu */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Filter By Menu</h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
              <div className="flex items-center gap-3">
                <img
                  src="/food/food-1.png"
                  alt="Chicken Fry"
                  className="w-8 h-8 rounded-md"
                />
                <span>Chicken Fry</span>
              </div>
              <span className="text-gray-500">26</span>
            </li>
            <li className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
              <div className="flex items-center gap-2">
                <img
                  src="/food/food-2.png"
                  alt="Burger Food"
                  className="w-8 h-8 rounded-md"
                />
                <span>Burger Food</span>
              </div>
              <span className="text-gray-500">34</span>
            </li>
            <li className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
              <div className="flex items-center gap-3">
                <img
                  src="/food/food-3.png"
                  alt="Pizza"
                  className="w-8 h-8 rounded-md"
                />
                <span>Pizza</span>
              </div>
              <span className="text-gray-500">16</span>
            </li>
            <li className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
              <div className="flex items-center gap-3">
                <img
                  src="/food/food-4.png"
                  alt="French Fries"
                  className="w-8 h-8 rounded-md"
                />
                <span>French Fries</span>
              </div>
              <span className="text-gray-500">36</span>
            </li>
            <li className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
              <div className="flex items-center gap-3">
                <img
                  src="/food/food-5.png"
                  alt="Vegetables"
                  className="w-8 h-8 rounded-md"
                />
                <span>Vegetables</span>
              </div>
              <span className="text-gray-500">10</span>
            </li>
          </ul>
        </div>

        {/* Popular Tags */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Popular Tags</h3>
          <div className="flex flex-wrap gap-2 text-xs text-gray-600">
            {[
              "Noodles",
              "Thai",
              "BBQ",
              "Featured",
              "Desserts",
              "Snacks",
              "Chinese",
              "Burger",
              "cheesy",
              "yummy",
              "salids",
              "cocktails",
            ].map((tag) => (
              <span key={tag} className="px-2 py-1 bg-gray-200 rounded">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Photo Gallery</h3>
          <div className="grid grid-cols-3 gap-y-1 pr-20">
            <Image src="/food/food-1.png" alt="Food 1" width={60} height={60} />
            <Image src="/food/food-2.png" alt="Food 2" width={60} height={60} />
            <Image src="/food/food-3.png" alt="Food 3" width={60} height={60} />
            <Image src="/food/food-4.png" alt="Food 4" width={60} height={60} />
            <Image src="/food/food-5.png" alt="Food 5" width={60} height={60} />
            <Image src="/food/food-6.png" alt="Food 6" width={60} height={60} />
          </div>
        </div>

        {/* Follow Us */}
        <div className="text-start">
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex items-start space-x-3 text-gray-500">
            <FaFacebookF /> <FaTwitter /> <FaInstagram />
            <FaPinterestSquare />
            <FaYoutube />
          </div>
        </div>
      </aside>
    </>
  );
};

export default RightSide;
