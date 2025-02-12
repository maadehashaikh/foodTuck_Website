"use client";
import React, { useState, ChangeEvent } from "react";
import { useCart } from "@/app/context/CartContext";
import { client } from "@/sanity/lib/client";
import { toast } from "react-toastify";

// Define types for cart items and form state
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface ShippingDetails {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
  zipCode: string;
}

const Checkout_Comp: React.FC = () => {
  const { cart, discount } = useCart() as {
    cart: CartItem[];
    discount: number;
  };

  const totalPrice: number = cart.reduce(
    (acc: number, item: CartItem) => acc + item.price * item.quantity,
    0
  );
  const discountedPrice: number = Math.round(
    totalPrice - (totalPrice * discount) / 100
  );
  const shippingCharge: number = 200;
  const finalTotal: number = discountedPrice + shippingCharge;

  const discountPer: string = `${discount} %`;
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    zipCode: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async () => {
    const orderData = {
      _type: "order",
      firstname: shippingDetails.firstname,
      lastname: shippingDetails.lastname,
      email: shippingDetails.email,
      phone: shippingDetails.phone,
      address: shippingDetails.address,
      zipcode: shippingDetails.zipCode,
      cartItems: cart.map((item: CartItem) => ({
        _key: crypto.randomUUID(),
        _type: "reference",
        _ref: item.id,
      })),
      total: totalPrice,
      totalAfterDiscount: finalTotal,
      discount: discountPer,
      orderdate: new Date().toISOString(),
    };

    try {
      await client.create(orderData);
      toast.success("Order placed successfully");
      setShippingDetails({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        address: "",
        zipCode: "",
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error caught while creating order", error.message);
      } else {
        console.error("An unexpected error occurred", error);
      }
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <>
      <div className="bg-checkout-bg bg-cover bg-center h-full">
        <div className="mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Form */}
          <div className="lg:col-span-2 shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                  value={shippingDetails.firstname}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  required
                />
                <input
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  value={shippingDetails.lastname}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={shippingDetails.email}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone number"
                  value={shippingDetails.phone}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="zipCode"
                  placeholder="Zip code"
                  value={shippingDetails.zipCode}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={shippingDetails.address}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  required
                />
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="shadow-md rounded-lg p-6 bg-white text-black">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cart.length > 0 ? (
                cart.map((item: CartItem) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-start"
                  >
                    <div>
                      <img
                        src={item.image}
                        className="w-20 h-20 rounded-lg bg-cover"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} x RS: {item.price.toFixed(2)}
                      </p>
                      <p className="text-sm font-semibold">
                        RS: {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500">
                  Your cart is empty.
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 mt-4 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Sub-total</span>
                <span>RS: {totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>RS: {shippingCharge.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span>{discount}%</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>RS: {finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={placeOrder}
              className="w-full mt-6 bg-orange-400 text-white px-4 py-2 rounded-md shadow-md hover:bg-orange-500"
            >
              Place an order &gt;
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout_Comp;
