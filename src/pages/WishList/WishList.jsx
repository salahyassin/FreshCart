import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function WishList() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState({});
  const [removeLoading, setRemoveLoading] = useState({});

  async function fetchWishlist() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.warning("You need to log in first!", { position: "top-center" });
        setLoading(false);
        return;
      }

      const response = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: { token },
      });

      setWishlist(response.data.data || []);
    } catch (error) {
      console.error("Error fetching wishlist:", error.response?.data?.message || error.message);
      toast.error("Failed to fetch wishlist", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  }

  async function removeFromWishlist(productId) {
    try {
      setRemoveLoading((prev) => ({ ...prev, [productId]: true }));
      const token = localStorage.getItem("token");
      if (!token) {
        toast.warning("You need to log in first!", { position: "top-center" });
        return;
      }

      await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers: { token },
      });

      toast.info("💔 Removed from wishlist", { position: "top-center" });
      setWishlist((prev) => prev.filter((item) => item._id !== productId));
    } catch (error) {
      console.error("Error removing from wishlist:", error.response?.data?.message || error.message);
      toast.error("Failed to remove from wishlist", { position: "top-center" });
    } finally {
      setRemoveLoading((prev) => ({ ...prev, [productId]: false }));
    }
  }

  async function addToCart(productId) {
    try {
      setCartLoading((prev) => ({ ...prev, [productId]: true }));
      const token = localStorage.getItem("token");
      if (!token) {
        toast.warning("You need to log in first!", { position: "top-center" });
        return;
      }

      await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId, quantity: 1 },
        {
          headers: { token },
        }
      );

      toast.success("🛒 Added to cart!", { position: "top-center" });
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data?.message || error.message);
      toast.error("Failed to add to cart", { position: "top-center" });
    } finally {
      setCartLoading((prev) => ({ ...prev, [productId]: false }));
    }
  }

  useEffect(() => {
    fetchWishlist();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-gray-700">Your wishlist is empty 😢</h2>
        <p className="text-gray-500 mt-2">Start adding items you love!</p>
        <Link
          to="/"
          className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Wishlist ❤️</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div
            key={product._id}
            className="border rounded-lg p-4 shadow-lg bg-white transition transform hover:scale-105"
          >
            <Link to={`/productDetails/${product._id}`} className="block">
              <img
                src={product.imageCover}
                alt={product.title}
                className="w-full h-48 object-contain mb-3 rounded-md"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                {product?.title?.split(" ").slice(0, 2).join(" ")}
              </h3>
            </Link>
            <p className="text-gray-600 mt-1 font-medium text-lg">${product.price.toFixed(2)}</p>

            <div className="mt-3 flex flex-col gap-2">
              <button
                onClick={() => addToCart(product._id)}
                disabled={cartLoading[product._id]}
                className={`w-full text-white px-4 py-2 rounded-lg transition duration-300 flex items-center justify-center ${
                  cartLoading[product._id] ? "bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {cartLoading[product._id] ? (
                  <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                ) : (
                  "Add to Cart 🛒"
                )}
              </button>

              <button
                onClick={() => removeFromWishlist(product._id)}
                disabled={removeLoading[product._id]}
                className={`w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 flex items-center justify-center ${
                  removeLoading[product._id] ? "bg-red-300" : ""
                }`}
              >
                {removeLoading[product._id] ? (
                  <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                ) : (
                  "Remove 💔"
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
