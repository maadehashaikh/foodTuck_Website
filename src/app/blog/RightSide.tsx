"use client";

import Image from "next/image";
import { useState, useEffect, ChangeEvent } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestSquare, FaYoutube } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { createClient } from "next-sanity";

interface BlogPost {
  _id: string;
  title: string;
  description: string;
  author: string;
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

const RightSide = () => {
  const [search, setSearch] = useState<string>("");
  const [blogdata, setBlogdata] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBlogs = async (): Promise<void> => {
      try {
        const BlogData: BlogPost[] = await client.fetch(`
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
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search Your Recipe..."
            className="w-full p-2 pl-4 pr-10 border border-gray-300 rounded-lg"
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-orange-500">
            <IoSearch size={20} />
          </button>
        </div>

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
          </p>
          <div className="flex justify-center space-x-3 mt-2 text-gray-500">
            <FaFacebookF /> <FaTwitter /> <FaInstagram />
            <FaPinterestSquare />
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-black font-semibold mb-3">Recent Post</h3>
          {loading ? (
            <div className="text-center text-amber-500 text-lg">
              <p>Fetching data from API...</p>
              <div className="spinner-border animate-spin inline-block border-4 border-t-4 border-amber-500 rounded-full"></div>
            </div>
          ) : (
            <div>
              {blogdata.length > 0 ? (
                blogdata.map((post: BlogPost) => (
                  <div key={post._id} className="rounded-lg overflow-hidden w-[300px] flex items-center justify-between mb-2">
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
                <p className="text-center text-gray-400">No blog posts available.</p>
              )}
            </div>
          )}
        </div>

        {/* Filter By Menu */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Filter By Menu</h3>
          <ul className="space-y-3 text-gray-600">
            {/* Food List */}
          </ul>
        </div>

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
