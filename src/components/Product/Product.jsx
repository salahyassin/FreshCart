import { Button } from "@heroui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addProductToCart } from "../../services/cartServices";
import { addToWishlist, removeFromWishlist, checkWishlist } from "../../services/wishlistService";
import { formatCurrency } from "../../services/currencyHelper";

export default function Product({ product }) {
  const [isLoading, setIsLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    async function fetchWishlistStatus() {
      if (!product?._id) return;
      const inWishlist = await checkWishlist(product._id);
      setIsWishlisted(inWishlist);
    }
    fetchWishlistStatus();
  }, [product?._id]);

  async function handleWishlist(productId) {
    setWishlistLoading(true);
    try {
      if (isWishlisted) {
        await removeFromWishlist(productId);
        setIsWishlisted(false);
      } else {
        await addToWishlist(productId);
        setIsWishlisted(true);
      }
    } catch (error) {
      console.error("Wishlist error:", error);
    } finally {
      setWishlistLoading(false);
    }
  }

  return (
    <div className="relative flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg p-4 transition-transform transform hover:scale-105 duration-300">
      {product?.priceAfterDiscount && (
        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-md">
          -{Math.round(((product.price - product.priceAfterDiscount) / product.price) * 100)}%
        </span>
      )}

      <Link to={`/productDetails/${product?._id}`} className="relative mx-auto flex overflow-hidden rounded-lg">
        <img className="object-cover w-full h-48 rounded-lg" src={product?.imageCover} alt={product?.title} />
      </Link>

      <div className="mt-4 px-2 pb-5 flex flex-col justify-between">
        <Link to={`/productDetails/${product?._id}`}>
          <h5 className="text-lg font-semibold tracking-tight text-gray-900 line-clamp-2">
            {product?.title?.split(" ").slice(0, 2).join(" ")}
          </h5>
        </Link>

        <div className="mt-2 mb-5">
          <p>
            {product?.priceAfterDiscount ? (
              <>
                <span className="text-xl font-bold text-red-600 mx-2">
                  {formatCurrency(product.priceAfterDiscount)}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  {formatCurrency(product.price)}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-gray-900">{formatCurrency(product.price)}</span>
            )}
          </p>
        </div>

        <div className="flex items-center justify-between space-x-2">
          <Button
            isLoading={isLoading}
            onPress={() => addProductToCart(product._id, setIsLoading)}
            className="flex-1 flex items-center justify-center rounded-lg bg-blue-600 px-8 py-3 text-sm font-medium text-white hover:bg-blue-700 transition duration-200"
          >
            Add to Cart
          </Button>

          <button
            onClick={() => handleWishlist(product._id)}
            disabled={wishlistLoading}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="bg-gray-100 flex items-center justify-center p-2 rounded-md hover:bg-gray-300 transition duration-200"
          >
            {wishlistLoading ? (
              <span className="animate-spin w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full"></span>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={isWishlisted ? "red" : "none"}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5 text-red-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
