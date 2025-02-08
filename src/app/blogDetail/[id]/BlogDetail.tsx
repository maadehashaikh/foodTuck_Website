"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "next-sanity";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { IoCalendarNumber } from "react-icons/io5";
import { FaMessage } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa";

type BlogItemType = {
  image: {
    asset: {
      url: string;
    };
  };
  date: string;
  author: string;
  title: string;
  description: string;
};

const client = createClient({
  projectId: "2sz91eg7",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

const builder = imageUrlBuilder(client);
export const urlFor = (source: any) => builder.image(source);

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blogItem, setBlogItem] = useState<BlogItemType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      const fetchBlogItem = async () => {
        try {
          const data: BlogItemType = await client.fetch(
            `*[_type == "blog" && _id == $id][0]`,
            { id }
          );

          setBlogItem(data);
        } catch (error) {
          console.error("Error fetching blog details:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchBlogItem();
    }
  }, [id]);

  if (loading) {
    return <p className="text-center text-amber-500">Loading...</p>;
  }

  if (!blogItem) {
    return <p className="text-center text-red-500">Blog not found!</p>;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src={urlFor(blogItem.image.asset).url()}
            alt={blogItem.title}
            width={400}
            height={200}
            className="rounded-lg"
          />
        </div>
        <div className="py-2 flex items-start justify-start gap-4">
          <div className="flex items-center justify-normal gap-1">
            <IoCalendarNumber className="text-amber-500 text-center text-lg" />
            <p className="text-black text-sm">
              {new Date(blogItem.date).toLocaleDateString("en-US", {
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
            <p className="text-black text-sm">Author: {blogItem.author}</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 mt-4 md:mt-0">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-black">
            {blogItem.title}
          </h1>
          <p className="mb-2 text-sm text-black pb-2">
            {blogItem.description}
          </p>
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
