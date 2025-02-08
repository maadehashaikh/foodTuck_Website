"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "next-sanity";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";

interface FoodItem {
  _id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  tags?: string[];
  image: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
  description?: string;
  available: boolean;
}

interface RecommendationProps {
  category: string;
  name: string;
}

const client = createClient({
  projectId: "2sz91eg7",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

const builder = imageUrlBuilder(client);
export const urlFor = (source: any) => builder.image(source);

const Recommendation: React.FC<RecommendationProps> = ({ category, name }) => {
  const [fooddata, setFooddata] = useState<FoodItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const FoodData: FoodItem[] = await client.fetch(
          `*[_type == "food" && category == $category]{
            _id,
            name,
            category,
            price,
            originalPrice,
            tags,
            image,
            description,
            available
          }`,
          { category }
        );

        // Exclude the current item
        const filteredItems = FoodData.filter((item) => item.name !== name);

        // Select up to 4 random items
        const shuffled = filteredItems.sort(() => 0.5 - Math.random());
        const selectedItems = shuffled.slice(0, 4);

        setFooddata(selectedItems);
      } catch (error) {
        console.error("Error fetching food data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFoodItems();
  }, [category, name]);

  return (
    <>
      <section className="text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-black font-bold my-2">
            More Recommendations For You 🍟
          </h1>
          {loading ? (
            <div className="text-center text-amber-500 text-lg">
              <p>Fetching Food data from API...</p>
              <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-4 border-amber-500 rounded-full"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-center items-center">
              {fooddata.length > 0 ? (
                fooddata.map((foodItem) => (
                  <Link href={`/food/${foodItem._id}`} key={foodItem._id}>
                    <div className="rounded-lg overflow-hidden w-auto h-auto text-black border-2 border-gray-200 flex flex-col items-center p-2">
                      <Image
                        src={urlFor(foodItem.image.asset).url()}
                        alt={foodItem.name}
                        width={200}
                        height={250}
                        className="w-full h-40 object-cover"
                      />
                      <div className="py-2 text-center">
                        <p className="text-black text-sm mb-2">
                          {foodItem.name}
                        </p>
                        <div className="text-amber-500 flex gap-3 text-xs justify-center">
                          <span>RS {foodItem.price}</span>
                          <span className="text-gray-500 text-xs line-through">
                            RS {foodItem.originalPrice}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-center text-gray-400 col-span-4">
                  No Food Items available.
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Recommendation;
