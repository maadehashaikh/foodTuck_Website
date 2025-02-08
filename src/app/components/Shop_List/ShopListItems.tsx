"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "next-sanity";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

const client = createClient({
  projectId: "2sz91eg7",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

const ShopListItems = () => {
  const [fooddata, setFooddata] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFood, setFilteredFood] = useState<any[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(3000);

  useEffect(() => {
    const latestProducts = async () => {
      const data = await client.fetch(`
          *[_type == "food"] | order(_createdAt desc)[0...4] {
            _id, name, category, price,image
          }
        `);
      const uniqueProducts: any = Array.from(
        new Map(data.map((item: any) => [item.name, item])).values()
      );
      setProducts(uniqueProducts);
    };
    latestProducts();
  }, []);

  useEffect(() => {
    const fetchFood = async () => {
      try {
        const FoodData = await client.fetch(`
        *[_type == "food"]{
          _id, name, category, price, originalPrice, tags, image, description, available,
        }
      `);
        const tagsArray = FoodData.map((item) => item.tags).flat();
        const uniqueTags: any = [...new Set(tagsArray)];
        const uniqueCategories: any = [
          ...new Set(FoodData.map((item) => item.category)),
        ];
        setCategory(uniqueCategories);

        setAllTags(uniqueTags);
        setFooddata(FoodData);
        setFilteredFood(FoodData);
      } catch (error) {
        console.error("Error fetching food data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFood();
  }, []);

  useEffect(() => {
    let filtered = fooddata;

    if (searchQuery.trim()) {
      filtered = filtered.filter((food) =>
        food.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((food) => food.category === selectedCategory);
    }

    if (minPrice !== null && maxPrice !== null) {
      filtered = filtered.filter(
        (food) => food.price >= minPrice && food.price <= maxPrice
      );
    }

    setFilteredFood(filtered);
  }, [searchQuery, selectedCategory, minPrice, maxPrice, fooddata]);

  return (
    <>
      <section className="w-full text-white py-4 flex justify-between items-start px-4 md:px-12 lg:px-20">
        <div className=" px-4 w-full md:w-[60%] border-2 border-gray-200">
          {loading ? (
            <div className="text-center text-amber-500 text-lg">
              <p>Fetching Food data from API...</p>
              <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-t-4 border-amber-500 rounded-full"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredFood.length > 0 ? (
                filteredFood.map((foodItem) => (
                  <Link href={`/food/${foodItem._id}`} key={foodItem._id}>
                    <div className="rounded-lg overflow-hidden w-full h-auto text-black border-2 border-red-100">
                      <Image
                        src={urlFor(foodItem.image.asset).url()}
                        alt={foodItem.name}
                        width={200}
                        height={250}
                        className="w-full h-48 object-cover"
                      />
                      <div className="py-2">
                        <p className="text-Black text-sm mb-2">
                          {foodItem.name}
                        </p>
                        <h4 className="text-2xl font-bold mb-4">
                          {foodItem.title}
                        </h4>
                        <div className="text-amber-500 flex gap-3 text-xs">
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
                <p className="text-center text-gray-400 col-span-3">
                  No Food Items available.
                </p>
              )}
            </div>
          )}
        </div>

        <div className=" py-2 w-full md:w-[25%] border-2 border-gray-200 px-5 rounded-md">
          {/* Search Bar */}
          <div className="relative mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Product"
              className="w-full p-2 border rounded-md focus:outline-none bg-orange-100 text-black"
            />
            <button className="absolute right-2 top-2 bg-orange-500 text-white px-3 py-1 rounded-md">
              <FaSearch />
            </button>
          </div>
          {/* Category Section */}
          <div className="mb-4 text-black">
            <h2 className="font-semibold mb-2">Category</h2>
            {category.map((onecategory, index) => (
              <div key={index} className="flex items-center mb-1">
                <input
                  type="checkbox"
                  id={onecategory}
                  name="category"
                  value={onecategory}
                  checked={selectedCategory === onecategory}
                  onChange={() => setSelectedCategory(onecategory)}
                  className="mr-2"
                />
                <label htmlFor={onecategory}>{onecategory}</label>
              </div>
            ))}
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-sm text-white mt-2 bg-orange-500 rounded-md py-1 px-2"
            >
              Clear Filter
            </button>
          </div>
          {/* Ad Banner */}
          <div className="mb-4 relative overflow-hidden rounded-lg">
            <img
              src="/left_side.png"
              alt="Ad"
              className="w-full h-48 object-cover rounded-lg"
            />

            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col justify-center items-start text-white text-center p-2 gap-8">
              <div className="flex flex-col justify-center items-start text-white text-center">
                <p className="text-lg font-bold">Perfect Taste</p>
                <p className="text-sm">Classic Restaurant</p>
                <p className="text-lg font-semibold">$45.00</p>
              </div>
              <div>
                <button className="mt-2 pr-3 py-1 text-white rounded flex items-start justify-between">
                  Shop Now
                  <span className="ml-2 mt-1">
                    <FaRegArrowAltCircleRight />
                  </span>
                </button>
              </div>
            </div>
          </div>
          {/* Price Filter */}
          <div className="mb-4 text-black">
            <h2 className="font-semibold mb-2">Filter By Price</h2>

            <input
              type="range"
              min="0"
              max="5000"
              value={maxPrice}
              className="w-full text-orange-500"
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />

            <div className="flex items-start justify-between text-sm text-gray-400 mt-2">
              <span>From 0 RS to {maxPrice} RS</span>
              <button
                className="bg-orange-500 text-white px-3 py-1 rounded-md hover:bg-orange-600"
                onClick={() => setMaxPrice(5000)}
              >
                Reset
              </button>
            </div>
          </div>

          {/* Latest Products */}
          <div className="mb-4 text-black">
            <h2 className="font-semibold mb-2">Latest Products</h2>
            {products.length > 0 ? (
              products.map((product: any) => (
                <div className="flex items-center mb-2">
                  <img
                    src={urlFor(product.image.asset).url()}
                    alt={product.name}
                    className="w-16 h-12 object-cover rounded"
                  />

                  <div className="ml-2">
                    <p className="text-sm font-semibold">{product.name}</p>
                    <p className="text-xs text-gray-500">RS: {product.price}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading products...</p>
            )}
          </div>

          {/* Food Tags */}
          <div>
            <h2 className="font-semibold mb-2">Product Tags</h2>
            <div className="flex flex-wrap gap-2 text-sm">
              {allTags.slice(0, 25).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-200 rounded text-gray-700 cursor-pointer hover:bg-orange-500 hover:text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopListItems;
