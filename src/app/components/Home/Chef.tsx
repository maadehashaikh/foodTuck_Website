"use client";
import React, { useEffect, useState } from "react";
import { createClient, SanityDocument } from "next-sanity";
import Image from "next/image";
import Link from "next/link";

// Define the Chef type
interface ChefType {
  _id: string;
  name: string;
  position: string;
  image?: {
    asset?: {
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

const Chef: React.FC = () => {
  const [chefs, setChefs] = useState<ChefType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchChefs = async (): Promise<void> => {
      try {
        const query = `
        *[_type == "chef" && available == true && name != "Jorina Begum" && name != "M. Mohammad"] {
          _id,
          name,
          position,
          image {
            asset->{
              url
            }
          }
        }`;
        const data: SanityDocument[] = await client.fetch(query);
        setChefs(data as ChefType[]);
      } catch (error) {
        console.error("Error fetching chefs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChefs();
  }, []);

  return (
    <section className="bg-black text-white py-16 px-4 lg:-mt-10 sm:-mt-20 md:px-8">
      <div className="container mx-auto">
        <h2 className="text-center text-amber-500 text-2xl mb-2">Chefs</h2>
        <h1 className="text-center text-4xl md:text-5xl font-bold mb-12">
          <span className="text-amber-500">Me</span>et Our Chef
        </h1>

        {loading ? (
          <p className="text-center text-amber-500 text-xl">Loading chefs...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {chefs.map((chef: ChefType) => (
              <div
                key={chef?._id}
                className="bg-gray-900 rounded-lg overflow-hidden shadow-lg"
              >
                <div className="relative h-72 flex">
                  <Image
                    src={chef.image?.asset?.url || "/placeholder.png"}
                    alt={chef.name}
                    layout="fill"
                    objectFit="cover"
                  />
                  <span className="bg-white mt-[226.5px] rounded-md z-10 w-[60%] h-[60px]">
                    <h3 className="font-bold text-xl mb-1 text-black ml-2">
                      {chef.name}
                    </h3>
                    <p className="text-black font-light ml-2">
                      {chef?.position}
                    </p>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center">
          <Link href="/chefs">
            <button className="bg-transparent border border-amber-500 text-amber-500 px-14 py-4 rounded-full hover:bg-orange-500 hover:text-white transition-colors duration-300">
              See More
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Chef;
