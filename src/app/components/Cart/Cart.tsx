"use client";
import React, { useState } from "react";
import { useCart } from "@/app/context/CartContext";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import { FaRegCalendarCheck } from "react-icons/fa";
import AuthGuard from "../Auth/AuthGuard";
import { useRouter } from "next/navigation";

// Define types for cart items and context functions
interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  updateCartItem: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  applyCoupon: (code: string) => void;
  discount: number;
}

const Cart: React.FC = () => {
  const { cart, updateCartItem, removeFromCart, applyCoupon, discount } =
    useCart() as CartContextType;
  
  const [coupon, setCoupon] = useState<string>("");

  const totalPrice: number = cart.reduce(
    (acc: number, item: CartItem) => acc + item.price * item.quantity,
    0
  );
  const discountedPrice: number = Math.round(
    totalPrice - (totalPrice * discount) / 100
  );
  const saveRs: number = totalPrice - discountedPrice;

  const router = useRouter();

  return (
    <AuthGuard>
      <div className="mx-auto p-4 text-black">
        <h2 className="text-2xl font-bold mb-4 text-center">Cart Items</h2>

        {cart.length === 0 ? (
          <p className="text-center text-gray-600">No items in cart</p>
        ) : (
          <>
            <div className="w-full overflow-x-auto px-4 sm:px-8 lg:px-16">
              <table className="w-full border border-gray-300 rounded-lg text-center">
                <thead className="bg-gray-100 text-gray-700 uppercase">
                  <tr>
                    <th className="p-2">Image</th>
                    <th className="p-2">Price</th>
                    <th className="p-2">Quantity</th>
                    <th className="p-2">Total</th>
                    <th className="p-2">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item: CartItem) => (
                    <tr key={item.id} className="border-b border-gray-200">
                      <td className="p-2">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                          className="rounded flex mx-auto"
                        />
                      </td>
                      <td className="p-2">RS {item.price}</td>
                      <td className="p-2">
                        <div className="flex items-center justify-center">
                          <button
                            className="px-2 bg-gray-300 text-black rounded-l"
                            onClick={() =>
                              updateCartItem(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="px-4">{item.quantity}</span>
                          <button
                            className="px-2 bg-gray-300 text-black rounded-r"
                            onClick={() =>
                              updateCartItem(item.id, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="p-2">RS {item.price * item.quantity}</td>
                      <td className="p-2">
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Coupon & Total Bill Section */}
            <div className="flex flex-col sm:flex-row gap-6 items-start justify-between mt-8 px-4 sm:px-8 lg:px-16">
              {/* Coupon Code Section */}
              <div className="flex flex-col items-start gap-2 w-full sm:w-1/2 p-3">
                <h1 className="text-2xl font-bold">Coupon Code</h1>
                <div className="border-2 border-gray-300 p-3 rounded-md w-full">
                  <p className="py-2 text-gray-500 text-sm">
                    Apply a coupon at checkout and enjoy discounts on your
                    favorite dishes. Use{" "}
                    <span className="font-bold">OUR CODE</span> to get 20% off
                    instantly.
                  </p>
                  <div className="flex flex-col md:flex-row sm:flex-row items-center gap-2">
                    <input
                      type="text"
                      placeholder="Enter Coupon Code"
                      className="border rounded w-full px-4 py-2 border-gray-400"
                      value={coupon}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setCoupon(e.target.value)
                      }
                    />
                    <button
                      className="bg-orange-400 text-white px-4 py-2 rounded"
                      onClick={() => applyCoupon(coupon)}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>

              {/* Total Price Section */}
              <div className="flex flex-col items-start gap-2 w-full sm:w-1/2 p-3">
                <h1 className="text-2xl font-bold">Total Bill</h1>
                <div className="border-2 border-gray-300 py-2 rounded-md w-full">
                  <div className="px-2">
                    <div className="flex items-center justify-between font-bold py-2">
                      <p className="text-gray-700">Cart Subtotal:</p>
                      <p className="text-gray-700">RS {totalPrice}</p>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <p className="text-gray-700">Save</p>
                      <p className="text-gray-700">RS: {saveRs}</p>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b-2 border-b-gray-300 pb-3">
                      {discount > 0 ? (
                        <>
                          <h1>After discount: </h1>
                          <p>RS: {discountedPrice}</p>
                        </>
                      ) : (
                        <p>No Discount Available Now ❗</p>
                      )}
                    </div>
                    <div className="flex items-center justify-between py-2 pb-3">
                      <p className="text-gray-700">Shipping Charge:</p>
                      <p className="text-gray-700">RS 200</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-2 py-2 font-bold">
                    <h1>Total Amount</h1>
                    <p>RS: {discountedPrice + 200}</p>
                  </div>
                </div>

                <button
                  className="bg-orange-400 text-white px-4 py-2 rounded w-full flex items-center justify-center"
                  onClick={() => router.push("/checkout")}
                >
                  Proceed to checkout
                  <FaRegCalendarCheck className="ml-2" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </AuthGuard>
  );
};

export default Cart;
