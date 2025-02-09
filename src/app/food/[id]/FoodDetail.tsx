"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "next-sanity";
import Image from "next/image";
import imageUrlBuilder, { ImageUrlBuilder } from "@sanity/image-url";
import { FaCartArrowDown } from "react-icons/fa6";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";
import { IoFastFoodOutline } from "react-icons/io5";
import { LiaHashtagSolid } from "react-icons/lia";
import {
  FaInstagramSquare,
  FaFacebook,
  FaTwitterSquare,
  FaShareSquare,
} from "react-icons/fa";
import { FaYoutubeSquare } from "react-icons/fa";

import Recommendation from "@/app/components/ShopDetails/Recommendation";

const client = createClient({
  projectId: "2sz91eg7",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: { asset: { _ref: string } }) =>
  builder.image(source);

interface FoodItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  image: { asset: { _ref: string } };
  available: string;
  category: string;
  tags: string[];
}

const FoodDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [foodItem, setFoodItem] = useState<FoodItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (id) {
      const fetchFoodItem = async () => {
        try {
          const data: FoodItem = await client.fetch(
            `*[_type == "food" && _id == $id][0]`,
            { id }
          );
          setFoodItem(data);
        } catch (error) {
          console.error("Error fetching food details:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchFoodItem();
    }
  }, [id]);

  if (loading) {
    return <p className="text-center text-amber-500">Loading...</p>;
  }

  if (!foodItem) {
    return <p className="text-center text-red-500">Food item not found!</p>;
  }

  const incQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <>
      <div className="container mx-auto py-8 text-white px-4 md:px-[10%]">
        <div className="flex flex-col sm:flex-col md:flex-row items-center justify-center gap-2">
          <div className="w-full md:w-1/2 flex justify-center">
            <Image
              src={urlFor(foodItem.image).url()}
              alt={foodItem.name}
              width={300}
              height={200}
              className="rounded-lg"
            />
          </div>
          <div className="w-full md:w-1/2 mt-4 md:mt-0">
            <button className="text-black">{foodItem.available}</button>
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-black">
              {foodItem.name}
            </h1>
            <p className="mb-2 text-sm text-black border-b-2 border-gray-200 pb-2">
              {foodItem.description}
            </p>
            <div className="text-amber-500 text-lg font-semibold">
              RS {foodItem.price}
              <span className="text-gray-500 text-sm line-through ml-2">
                RS {foodItem.originalPrice}
              </span>
            </div>

            {/* Add to cart button */}
            <div className="flex items-center py-2 space-x-3">
              <div className="flex border border-gray-300 rounded-sm text-black">
                <button
                  className="px-3 py-1 border-r border-gray-300"
                  onClick={decreaseQuantity}
                >
                  -
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button
                  className="px-3 py-1 border-l border-gray-300"
                  onClick={incQuantity}
                >
                  +
                </button>
              </div>
              <Link href="/cart">
                <button
                  className="bg-amber-500 text-white px-4 py-2 rounded-md flex items-center text-sm md:text-base"
                  onClick={() =>
                    addToCart({
                      id: foodItem._id,
                      name: foodItem.name,
                      price: foodItem.price,
                      image: urlFor(foodItem.image).url(),
                      quantity: quantity,
                    })
                  }
                >
                  <FaCartArrowDown className="mr-2" />
                  Add to Cart
                </button>
              </Link>
            </div>

            {/* Category & Tags */}
            <div className="flex flex-col text-sm mt-2">
              <h2 className="text-black flex items-center my-1">
                <IoFastFoodOutline className="mr-1 font-bold" />
                Category: <span className="ml-1">{foodItem.category}</span>
              </h2>
              <h2 className="text-black flex items-start my-1">
                <LiaHashtagSolid className="mr-1 font-bold" />
                Tags: <span className="ml-1">{foodItem.tags.join(", ")}</span>
              </h2>
            </div>
            <div className="flex items-center justify-start text-black mt-3">
              <h2 className="text-black flex items-start ">
                <FaShareSquare className="mr-1 font-bold" />
                Share:
              </h2>
              <div className="flex flex-row items-center justify-around ml-2">
                <FaYoutubeSquare />
                <FaInstagramSquare />
                <FaFacebook />
                <FaTwitterSquare />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendation */}
      <Recommendation category={foodItem.category} name={foodItem.name} />
    </>
  );
};

export default FoodDetail;
