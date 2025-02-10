import React from "react";

// Define types for props and menu item
interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
}

interface MenuRightProps {
  menudata: MenuItem[];
  image: string;
  heading: string;
}

const MenuRight: React.FC<MenuRightProps> = ({ menudata, image, heading }) => {
  return (
    <div className="w-[90%] lg:w-[70%] flex flex-col-reverse lg:flex-row items-center lg:items-start justify-between m-auto my-16">
      {/* Content moves below image on small screens */}
      <div className="w-full lg:w-[75%] px-5 lg:pr-10 text-center sm:text-start lg:text-left">
        <h1 className="text-2xl font-bold">{heading}</h1>
        {menudata.map((item) => (
          <div key={item?._id} className="flex items-start justify-start my-2">
            <div className="p-2 w-[80%]">
              <p className="text-xl font-semibold">{item?.name}</p>
              <p className="text-sm w-[70%]">
                {item.description.split(" ").slice(0, 12).join(" ")}...
              </p>
            </div>
            <div>
              <p className="text-orange-400 font-bold">Rs : {item?.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Image on top for small screens */}
      <div className="w-full lg:w-[30%] flex justify-center lg:justify-end">
        <img src={image} alt="Menu" className="h-64 lg:h-96 w-auto" />
      </div>
    </div>
  );
};

export default MenuRight;
