import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";
import { toast } from "react-toastify";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    color: "",
    isBestSeller: false,
  });

  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/products/${id}`);
        const {
          name,
          description,
          price,
          category,
          color,
          isBestSeller,
          image,
        } = res.data;
        setForm({ name, description, price, category, color, isBestSeller });
        setExistingImage(image);
      } catch {
        toast.error("Failed to load product");
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([key, value]) => fd.append(key, value));
    if (image) fd.append("image", image);

    try {
      await axiosInstance.put(`/products/${id}`, fd);
      toast.success("Product updated successfully!", {
        autoClose: 1000,
        onClose: () => navigate("/products"),
      });
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error("Failed to update product");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white/5 backdrop-blur-md p-5 rounded-xl shadow-lg border border-white/10 space-y-4"
        encType="multipart/form-data"
      >
        <h2 className="text-xl font-semibold text-center text-white">
          Edit Product
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          className="w-full rounded-md py-2 px-3 text-sm bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DA9B2B]"
          value={form.name}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="w-full rounded-md py-2 px-3 text-sm bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DA9B2B]"
          rows={2}
          value={form.description}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          className="w-full rounded-md py-2 px-3 text-sm bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DA9B2B]"
          value={form.price}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          className="w-full rounded-md py-2 px-3 text-sm bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DA9B2B]"
          value={form.category}
          onChange={handleChange}
        />

        <input
          type="text"
          name="color"
          placeholder="Color"
          className="w-full rounded-md py-2 px-3 text-sm bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DA9B2B]"
          value={form.color}
          onChange={handleChange}
        />

        <label className="flex items-center gap-2 text-sm text-white">
          <input
            type="checkbox"
            name="isBestSeller"
            checked={form.isBestSeller}
            onChange={handleChange}
            className="accent-[#DA9B2B]"
          />
          Best Seller
        </label>

        {existingImage && (
          <div className="text-center">
            <img
              src={`http://localhost:5000/uploads/${existingImage}`}
              alt="Current"
              className="h-20 w-20 mx-auto object-cover rounded"
            />
            <p className="text-xs text-gray-400 mt-1">Current Image</p>
          </div>
        )}

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full text-white file:bg-[#DA9B2B] file:text-white file:border-none file:rounded-md file:px-3 file:py-1 file:cursor-pointer bg-white/10 p-1.5 rounded-md"
          accept="image/*"
        />

        <button
          type="submit"
          className="w-full bg-[#DA9B2B] hover:bg-[#c88c27] text-white py-2 text-sm rounded-md transition"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
