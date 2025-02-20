import axios from "axios";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Custom toast options
const toastOptions = {
  position: "bottom-right",
  autoClose: 2500,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  transition: Bounce,
  style: {
    borderRadius: "8px",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    fontWeight: "bold",
    fontSize: "14px",
  },
};

// Function to add a product to the wishlist
export async function addToWishlist(productId) {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("You must be logged in to add to wishlist.");

    await axios.post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      { productId },
      { headers: { token } }
    );

    toast.success("✅ Added to Wishlist!", {
      ...toastOptions,
      style: { ...toastOptions.style, backgroundColor: "#28a745", color: "#fff" },
    });
  } catch (error) {
    toast.error("❌ " + (error.response?.data?.message || "Failed to add to wishlist."), {
      ...toastOptions,
      style: { ...toastOptions.style, backgroundColor: "#d32f2f", color: "#fff" },
    });
  }
}

// Function to remove a product from the wishlist
export async function removeFromWishlist(productId) {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("You must be logged in to remove from wishlist.");

    await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
      headers: { token },
    });

    toast.info("⚠️ Removed from Wishlist", {
      ...toastOptions,
      style: { ...toastOptions.style, backgroundColor: "#ff9800", color: "#fff" },
    });
  } catch (error) {
    toast.error("❌ " + (error.response?.data?.message || "Failed to remove from wishlist."), {
      ...toastOptions,
      style: { ...toastOptions.style, backgroundColor: "#d32f2f", color: "#fff" },
    });
  }
}

// ✅ Function to check if a product is in the wishlist
export async function checkWishlist(productId) {
  try {
    const token = localStorage.getItem("token");
    if (!token) return false;

    const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
      headers: { token },
    });

    return data?.data?.some((item) => item._id === productId);
  } catch (error) {
    console.error("Error checking wishlist:", error);
    return false;
  }
}
