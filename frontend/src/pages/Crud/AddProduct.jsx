import { useState } from "react";
import axiosInstance from "../../api/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    color: "",
    isBestSeller: false,
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([key, value]) => fd.append(key, value));
    if (image) fd.append("image", image);

    try {
     await axiosInstance.post("/products/create", fd);
    
      toast.success("Product added successfully!", {
        autoClose: 1000,
        onClose: () => navigate("/products"),
      });
    } catch {
      toast.error("Error adding product");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1E1A38] via-[#2D1C4C] to-[#1E1A38] px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/5 backdrop-blur-md w-full max-w-sm p-4 rounded-xl shadow-lg border border-white/10 space-y-4"
        encType="multipart/form-data"
      >
        <h2 className="text-lg font-semibold text-center text-white">
          Add Product
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full rounded-md py-1.5 px-3 text-sm bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DA9B2B]"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full rounded-md py-1.5 px-3 text-sm bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DA9B2B]"
          rows={2}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full rounded-md py-1.5 px-3 text-sm bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DA9B2B]"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="w-full rounded-md py-1.5 px-3 text-sm bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DA9B2B]"
        />

        <input
          type="text"
          name="color"
          placeholder="Color"
          value={form.color}
          onChange={handleChange}
          className="w-full rounded-md py-1.5 px-3 text-sm bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DA9B2B]"
        />

        <label className="flex items-center text-white space-x-2 text-sm">
          <input
            type="checkbox"
            name="isBestSeller"
            checked={form.isBestSeller}
            onChange={handleChange}
            className="accent-[#DA9B2B]"
          />
          <span>Best Seller</span>
        </label>

        <div>
          <label className="block text-sm text-white mb-1">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-white file:bg-[#DA9B2B] file:text-white file:border-none file:rounded-md file:px-3 file:py-1 file:cursor-pointer bg-white/10 p-1.5 rounded-md"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 w-14 h-14 object-cover rounded-md border border-white/20"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-[#DA9B2B] text-white py-2 rounded-md hover:bg-[#c88c27] transition text-sm font-medium"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
