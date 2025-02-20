import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductLoadingScreen from "../../components/LoadingScreen/ProductLoadingScreen";
import Slider from "react-slick";
import { Button } from "@heroui/react";
import { addProductToCart } from "../../services/cartServices";
import { formatCurrency } from "../../services/currencyHelper";
import "react-toastify/dist/ReactToastify.css";
import { addToWishlist, removeFromWishlist, checkWishlist } from "../../services/wishlistService";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [addToCartLoading, setAddToCartLoading] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
        setProduct(data.data);
        setIsWishlisted(await checkWishlist(id));
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [id]);

  const handleWishlistToggle = async () => {
    if (!product) return;
    setWishlistLoading(true);
    try {
      if (isWishlisted) {
        await removeFromWishlist(product._id);
      } else {
        await addToWishlist(product._id);
      }
      setIsWishlisted(!isWishlisted);
    } catch (error) {
      console.error("Wishlist error:", error);
    }
    setWishlistLoading(false);
  };

  if (isLoading) {
    return <ProductLoadingScreen />;
  }

  return (
    <div>
      <div className="flex items-center flex-wrap -mx-4">
        <div className="w-full md:w-1/3 px-4 mb-8">
          <Slider dots infinite speed={200} slidesToShow={1} slidesToScroll={1} arrows={false}>
            {product.images?.map((img) => (
              <img key={img} src={img} alt="Product" className="w-full h-96 object-contain rounded-lg mb-4" />
            ))}
          </Slider>
        </div>
        <div className="w-full md:w-2/3 px-4">
          <h2 className="text-3xl font-bold mb-2">{product?.title}</h2>
          <div className="mb-4">
            {product.priceAfterDiscount ? (
              <>
                <span className="text-2xl font-bold mr-2">{formatCurrency(product.priceAfterDiscount)}</span>
                <span className="text-gray-500 line-through">{formatCurrency(product.price)}</span>
              </>
            ) : (
              <span className="text-2xl font-bold mr-2">{formatCurrency(product.price)}</span>
            )}
          </div>
          <h5 className="my-2"><span className="font-bold">Category:</span> {product?.category?.name}</h5>
          <h5 className="my-2"><span className="font-bold">Brand:</span> {product?.brand?.name}</h5>
          <p className="text-gray-700 mb-6">{product?.description}</p>
          <div className="flex space-x-4 mb-6">
            <Button
              isLoading={addToCartLoading}
              onPress={() => addProductToCart(product?._id, setAddToCartLoading)}
              className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700"
            >
              Add to Cart
            </Button>
            <button
              onClick={handleWishlistToggle}
              disabled={wishlistLoading}
              className={`flex gap-2 items-center px-6 py-2 rounded-md ${
                isWishlisted ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {wishlistLoading ? "Processing..." : isWishlisted ? "Remove from Wishlist" : "Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
