"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { FaRegThumbsUp } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { CiShare2 } from "react-icons/ci";

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
        console.log("Fetched Data: ", BlogData.image); // Logs fetched data
      } catch (error) {
        console.error("Error fetching BlogData:", error);
      } finally {
        setLoading(false); // Ensures loading state is updated after fetching
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section className="bg-black text-white py-4">
      <div className="container mx-auto px-4">
        <h2 className="text-amber-500 text-2xl font-serif text-center mb-2">
          Blog Post
        </h2>
        <h3 className="text-4xl font-bold text-center mb-12">
          <span className="text-amber-500">La</span>
          test News & Blog
        </h3>

        {loading ? (
          <div className="text-center text-amber-500 text-lg">
            <p>Fetching data from API...</p>
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-4 border-amber-500 rounded-full"></div>{" "}
          </div>
        ) : (
          <div className="flex items-center justify-evenly gap-0">
            {blogdata.length > 0 ? (
              blogdata.map((post) => (
                <div
                  key={post._id}
                  className="bg-black rounded-lg overflow-hidden border-2 border-white w-80 h-[350px]"
                >
                  <Image
                    src={post.image.asset.url}
                    alt={post.title}
                    width={200}
                    height={250}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <p className="text-amber-500 text-sm mb-2">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <h4 className="text-xl font-semibold mb-4">{post.title}</h4>
                    <div className="flex items-center justify-between">
                      <Link
                        href={`/blog`}
                        className="text-amber-500 hover:underline text-sm"
                      >
                        Learn More
                      </Link>

                      <div className="flex items-center justify-between gap-3">
                        <FaRegThumbsUp />
                        <MdMessage className="text-amber-500" />
                        <CiShare2 />
                      </div>
                    </div>
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
    </section>
  );
};

export default Latest_Blogs;
