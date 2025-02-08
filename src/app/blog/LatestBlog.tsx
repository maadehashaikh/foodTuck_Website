"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "next-sanity";
import Link from "next/link";
import { IoCalendarNumber } from "react-icons/io5";
import { FaMessage } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa6";

const client = createClient({
  projectId: "2sz91eg7",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

const Latest_Blogs = () => {
  const [blogdata, setBlogdata] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const BlogData = await client.fetch(`
          *[_type == "blog"]{
            _id,
            title,
            description,
            author,
            date,
            "image" : image.asset->url
          }`);

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
    <section className="bg-white text-white py-8">
      <div className="container mx-auto px-4">
        {loading ? (
          <div className="text-center text-amber-500 text-lg">
            <p>Fetching data from API...</p>
            <div className="animate-spin w-8 h-8 border-4 border-t-4 border-amber-500 rounded-full"></div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-evenly gap-8 w-[80%] px-10">
            {blogdata.length > 0 ? (
              blogdata.map((post) => (
                <div
                  key={post._id}
                  className=" rounded-lg overflow-hidden border-2 border-white w-auto h-auto"
                >
                  <img
                    src={post.image ? post.image : "/fallback-image.jpg"}
                    alt={post.title || "Blog image"}
                    width={500}
                    height={400}
                    className=" object-cover"
                  />
                  <div className=" py-2 flex items-start justify-start gap-4">
                    <div className="flex items-center justify-normal gap-1">
                      <IoCalendarNumber className="text-amber-500 text-center text-lg" />
                      <p className="text-black text-sm">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex items-center justify-normal gap-1">
                      <FaMessage className="text-amber-500 text-center" />
                      <p className="text-black text-sm">23</p>
                    </div>
                    <div className="flex items-center justify-normal gap-1">
                      <FaUserCheck className="text-amber-500 text-center" />
                      <p className="text-black text-sm">
                        Author :{post.author}
                      </p>
                    </div>
                  </div>

                  <h4 className="text-xl font-semibold mb-4 text-black border-b-2 border-b-gray-400 pb-2">
                    {post.title}
                  </h4>

                  <p className="text-sm font-thin mb-4 text-black pb-2 w-[95%]">
                    {post.description.length > 500
                      ? `${post.description.substring(0, 200)}...`
                      : post.description}
                  </p>

                  <Link
                    href={`/blogDetail/${post._id}`}
                    className="text-amber-500 text-sm border-2 border-amber-500 p-2 rounded-lg flex items-center gap-3 w-32"
                  >
                    Read More
                    <FaLocationArrow className="text-amber-500" />
                  </Link>
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
    </section>
  );
};

export default Latest_Blogs;
