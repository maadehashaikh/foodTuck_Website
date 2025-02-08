"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { createClient } from "next-sanity";

interface Food {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  tags?: string[];
  imageUrl: string;
  available: boolean;
  category: {
    _id: string;
    name: string;
  };
  description?: string;
}

interface Category {
  _id: string;
  name: string;
}

const client = createClient({
  projectId: "2sz91eg7",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

const PickMenu: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("Breakfast");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const foodData: Food[] = await client.fetch(`
            *[_type == "food"] [0...8]{
              _id,
              name,
              price,
              originalPrice,
              tags,
              "imageUrl": image.asset->url,
              available,
              category->{
                _id,
                name
              }
            }
          `);

        const categoryData: Category[] = await client.fetch(`
            *[_type == "foodCategory"] {
              _id,
              name
            }
          `);

        setFoods(foodData);
        setCategories(categoryData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div>
        <section className="bg-black text-white py-16 px-4 md:px-8">
          <div className="container mx-auto">
            <h2 className="text-center text-amber-500 text-2xl mb-2">
              Choose & pick
            </h2>
            <h1 className="text-center text-4xl md:text-5xl font-bold mb-8">
              <span className="text-amber-500">Fr</span>om Our Menu
            </h1>

            {loading ? (
              <p className="text-center text-amber-500 text-xl">
                Loading menu...
              </p>
            ) : (
              <>
                {/* Nav bar  */}
                <nav className="bg-black text-white py-4">
                  <ul className="flex justify-center space-x-6">
                    {[
                      "Breakfast",
                      "Lunch",
                      "Dinner",
                      "Dessert",
                      "Drink",
                      "Snack",
                      "Soup",
                    ].map((item, index) => (
                      <li key={index}>
                        <a href="#" className="transition hover:text-amber-500">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="flex flex-wrap justify-center gap-4 mb-12">
                  {categories.map((category) => (
                    <button
                      key={category._id}
                      className={`px-4 py-2 rounded-full ${
                        activeCategory === category.name
                          ? "bg-amber-500 text-white"
                          : "text-amber-500 hover:bg-amber-500 hover:text-white"
                      } transition-colors duration-300`}
                      onClick={() => setActiveCategory(category.name)}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-[35%] ">
                    <Image
                      src="/pick menu.png"
                      alt="Featured Dish"
                      width={350}
                      height={400}
                      className="rounded-lg object-cover ml-[80px]"
                    />
                  </div>
                  <div className="md:w-[55%] ml-10 grid grid-cols-1 sm:grid-cols-2">
                    {foods.map((food) => (
                      <div key={food._id} className="flex items-center gap-2">
                        <Image
                          src={food.imageUrl}
                          alt={food.name}
                          width={80}
                          height={100}
                          className="rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-lg">{food.name}</h3>
                          <p className="text-gray-400 text-sm">
                            {food.description || "No description available."}
                          </p>
                          <p className="text-amber-500 font-bold mt-1">
                            RS : {food.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default PickMenu;
