import { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axios";
import { toast } from "react-toastify";
import useAuthStore from "../store/authStore";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const ProductCard = ({ product, fetchProducts }) => {
  const { role } = useAuthStore();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/products/${product._id}`);
      toast.success("Product deleted");
      fetchProducts();
    } catch (err) {
      toast.error("Error deleting product");
    }
  };

  return (
    <div className="bg-[#1e293b]/80 backdrop-blur-md border border-gray-700 rounded-2xl overflow-hidden shadow hover:shadow-lg transition duration-200 flex flex-col h-96">
      {product.image && (
        <div className="p-3">
          <img
            src={`http://localhost:5000/uploads/${product.image}`}
            alt={product.name}
            className="h-44 w-full object-cover rounded-lg"
          />
        </div>
      )}

      <div className="p-4 space-y-2 flex flex-col justify-between flex-grow text-white">
        <h2 className="text-lg font-semibold truncate">{product.name}</h2>
        <p className="text-sm text-gray-300 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-indigo-400 font-bold text-md">
            ${product.price}
          </span>
          {product.isBestSeller && (
            <span className="text-xs bg-[#DA9B2B] text-gray-900 font-semibold px-2 py-0.5 rounded-full">
              Best Seller
            </span>
          )}
        </div>

        {role === "admin" && (
          <div className="flex gap-2 mt-4">
            <Link
              to={`/products/edit/${product._id}`}
              className="flex-1 text-center text-sm bg-[#DA9B2B] hover:bg-[#c88c27] text-gray-900 px-3 py-2 rounded-md transition"
            >
              Edit
            </Link>
            <button
              onClick={() => setShowConfirm(true)}
              className="flex-1 text-center text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md transition"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/*Dark-Themed Delete Modal */}
      {showConfirm && (
        <ConfirmDeleteModal
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
};

export default ProductCard;
