"use client";
import React, { useEffect, useState } from "react";
import NormalNavBar from "../General/NormalNavBar";
import PageName from "../General/PageName";
import MenuRight from "./MenuRight";
import { createClient } from "next-sanity";
import MenuLeft from "./MenuLeft";
import Status from "../Home/Satus";

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
}

const client = createClient({
  projectId: "2sz91eg7",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

const Menu: React.FC = () => {
  const [menudata, setMenudata] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const query = `
          *[_type == "food"] {
            _id,
            name,
            description,
            price,
            category, 
            tags
          }`;
        const data: MenuItem[] = await client.fetch(query);
        setMenudata(data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  return (
    <>
      <NormalNavBar />
      <PageName pageName="Menu" title="Our Menu" />
      {/* Starter Component */}
      {loading ? (
        <p className="text-center text-lg font-semibold">Loading data...</p>
      ) : (
        <MenuLeft
          menudata={menudata
            .filter((item) => item.category === "Starter")
            .slice(0, 4)}
          image={"/menu/starter_menu.png"}
          heading="Starter Menu"
        />
      )}

      {/* Main Course Component */}
      {loading ? (
        <p className="text-center text-lg font-semibold">Loading data...</p>
      ) : (
        <MenuRight
          menudata={menudata
            .filter((item) => item.category === "Main Course")
            .slice(0, 4)}
          image={"/menu/burger.png"}
          heading="Main Course"
        />
      )}

      {/* Satatus Component */}
      <Status />

      {/* Dessert Component */}

      {loading ? (
        <p className="text-center text-lg font-semibold">Loading data...</p>
      ) : (
        <MenuLeft
          menudata={menudata
            .filter((item) => item.category === "dessert")
            .slice(0, 4)}
          image={"/menu/dessert.png"}
          heading="Dessert"
        />
      )}

      {/*  */}
      {loading ? (
        <p className="text-center text-lg font-semibold">Loading data...</p>
      ) : (
        <MenuRight
          menudata={menudata
            .filter((item) => item.category === "drinks")
            .slice(0, 4)}
          image={"/menu/drinks.png"}
          heading="Drinks"
        />
      )}
    </>
  );
};

export default Menu;
