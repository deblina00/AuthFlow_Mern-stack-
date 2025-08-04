// import { useEffect, useState } from "react";
// import axiosInstance from "../../api/axios";
// import ProductCard from "../../components/ProductCard";
// import { Link } from "react-router-dom";
// import useAuthStore from "../../store/authStore";
// import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";

// const Products = () => {
//   const { role, token } = useAuthStore();
//   console.log("Current role:", role); //for debugging
//   const [products, setProducts] = useState([]);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [targetId, setTargetId] = useState(null);
//   const [viewMode, setViewMode] = useState("card"); // card | table
//   const [filters, setFilters] = useState({
//     minPrice: "",
//     maxPrice: "",
//     category: "",
//     color: "",
//     bestSeller: false,
//   });

//   const fetchProducts = async () => {
//     try {
//       const query = new URLSearchParams();
//       Object.entries(filters).forEach(([key, value]) => {
//         if (value || value === false) {
//           if (key === "bestSeller" && !value) return;
//           query.append(key, value);
//         }
//       });

//       const res = await axiosInstance.get(`/products?${query.toString()}`);
//       setProducts(res.data);
//     } catch (err) {
//       console.error("Failed to fetch products", err);
//     }
//   };

//   useEffect(() => {
//     console.log("Role:", role, "Token:", token);
//   }, [role, token]);

//   useEffect(() => {
//     fetchProducts();
//   }, [filters]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFilters((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleTableDelete = async (id) => {
//     try {
//       await axiosInstance.delete(`/products/${id}`);
//       toast.success("Product deleted successfully!");
//       fetchProducts();
//     } catch (err) {
//       toast.error("Error deleting product");
//     } finally {
//       setShowConfirm(false);
//       setTargetId(null);
//     }
//   };

//   const resetFilters = () => {
//     setFilters({
//       minPrice: "",
//       maxPrice: "",
//       category: "",
//       color: "",
//       bestSeller: false,
//     });
//   };

//   return (
//     <div className="min-h-screen p-6 max-w-6xl mx-auto text-white">
//       <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
//         <h1 className="text-3xl font-bold text-white">Product List</h1>
//         <div className="flex items-center gap-3">
//           <span className="text-sm font-medium text-gray-300">View:</span>
//           <label className="relative inline-flex items-center cursor-pointer">
//             <input
//               type="checkbox"
//               className="sr-only peer"
//               checked={viewMode === "table"}
//               onChange={(e) => setViewMode(e.target.checked ? "table" : "card")}
//             />
//             <div className="w-14 h-7 bg-gray-700 rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
//             <span className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform transform peer-checked:translate-x-7"></span>
//           </label>
//           <span className="text-sm text-gray-300">
//             {viewMode === "card" ? "Card View" : "Table View"}
//           </span>
//         </div>
//       </div>

//       {/* 🔍 Filter Section */}
//       <div className="relative mb-6">
//         <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
//           <div className="w-[90%] h-40 bg-blue-500/10 blur-3xl rounded-full"></div>
//         </div>

//         <div className="relative z-10 bg-[#1e293b]/80 backdrop-blur-md text-white p-4 rounded-lg shadow grid grid-cols-1 md:grid-cols-6 gap-4 border border-gray-600">
//           <input
//             type="number"
//             name="minPrice"
//             placeholder="Min Price"
//             value={filters.minPrice}
//             onChange={handleChange}
//             className="p-2 border border-gray-600 bg-[#0f172a] text-white rounded text-sm placeholder-gray-400"
//           />
//           <input
//             type="number"
//             name="maxPrice"
//             placeholder="Max Price"
//             value={filters.maxPrice}
//             onChange={handleChange}
//             className="p-2 border border-gray-600 bg-[#0f172a] text-white rounded text-sm placeholder-gray-400"
//           />
//           <input
//             type="text"
//             name="category"
//             placeholder="Category"
//             value={filters.category}
//             onChange={handleChange}
//             className="p-2 border border-gray-600 bg-[#0f172a] text-white rounded text-sm placeholder-gray-400"
//           />
//           <input
//             type="text"
//             name="color"
//             placeholder="Color"
//             value={filters.color}
//             onChange={handleChange}
//             className="p-2 border border-gray-600 bg-[#0f172a] text-white rounded text-sm placeholder-gray-400"
//           />
//           <label className="flex items-center gap-2 text-sm text-white">
//             <input
//               type="checkbox"
//               name="bestSeller"
//               checked={filters.bestSeller}
//               onChange={handleChange}
//               className="accent-blue-500"
//             />
//             Best Seller
//           </label>
//           <button
//             onClick={resetFilters}
//             className="bg-[#334155] text-white text-sm p-2 rounded border border-gray-600 hover:bg-[#475569] col-span-full md:col-span-1"
//           >
//             Reset Filters
//           </button>
//         </div>
//       </div>

//       {/* 🧱 View Modes */}
//       {products.length === 0 ? (
//         <p className="text-center text-gray-300">No products found.</p>
//       ) : viewMode === "card" ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {products.map((product) => (
//             <ProductCard
//               key={product._id}
//               product={product}
//               fetchProducts={fetchProducts}
//             />
//           ))}
//         </div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-[#1e293b] border border-gray-700 text-sm rounded shadow text-white">
//             <thead className="bg-[#334155] border-b border-gray-600 text-left text-gray-300">
//               <tr>
//                 {role === "admin" && <th className="px-4 py-2">Actions</th>}
//                 <th className="px-4 py-2">Image</th>
//                 <th className="px-4 py-2">Name</th>
//                 <th className="px-4 py-2">Category</th>
//                 <th className="px-4 py-2">Color</th>
//                 <th className="px-4 py-2">Price</th>
//                 <th className="px-4 py-2">Best Seller</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map((p) => (
//                 <tr
//                   key={p._id}
//                   className="border-b border-gray-700 hover:bg-[#475569]"
//                 >
//                   <td className="px-4 py-2">
//                     <img
//                       src={`http://localhost:5000/uploads/${p.image}`}
//                       alt={p.name}
//                       className="h-12 w-12 object-cover rounded"
//                     />
//                   </td>
//                   <td className="px-4 py-2">{p.name}</td>
//                   <td className="px-4 py-2">{p.category}</td>
//                   <td className="px-4 py-2">{p.color}</td>
//                   <td className="px-4 py-2">${p.price}</td>
//                   <td className="px-4 py-2">{p.isBestSeller ? "✔️" : "—"}</td>
//                   {role === "admin" && (
//                     <td className="px-4 py-2">
//                       <div className="flex gap-2 items-center">
//                         <Link
//                           to={`/products/edit/${p._id}`}
//                           className="text-yellow-400 hover:text-yellow-300 text-sm font-medium"
//                         >
//                           ✏️
//                         </Link>
//                         <button
//                           onClick={() => {
//                             setTargetId(p._id);
//                             setShowConfirm(true);
//                           }}
//                           className="text-red-400 hover:text-red-300 text-sm font-medium"
//                         >
//                           🗑️
//                         </button>
//                       </div>
//                     </td>
//                   )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           {showConfirm && (
//             <ConfirmDeleteModal
//               message="Are you sure you want to delete this product?"
//               onConfirm={() => handleTableDelete(targetId)}
//               onCancel={() => {
//                 setShowConfirm(false);
//                 setTargetId(null);
//               }}
//             />
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Products;

import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";
import ProductCard from "../../components/ProductCard";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";

const Products = () => {
  const { role, token } = useAuthStore();
  console.log("Current role:", role); //for debugging
  const [products, setProducts] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [targetId, setTargetId] = useState(null);
  const [viewMode, setViewMode] = useState("card"); // card | table
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    category: "",
    color: "",
    bestSeller: false,
  });

  const fetchProducts = async () => {
    try {
      const query = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value || value === false) {
          if (key === "bestSeller" && !value) return;
          query.append(key, value);
        }
      });

      const res = await axiosInstance.get(`/products?${query.toString()}`);
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  useEffect(() => {
    console.log("Role:", role, "Token:", token);
  }, [role, token]);

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTableDelete = async (id) => {
    try {
      await axiosInstance.delete(`/products/${id}`);
      toast.success("Product deleted successfully!");
      fetchProducts();
    } catch (err) {
      toast.error("Error deleting product");
    } finally {
      setShowConfirm(false);
      setTargetId(null);
    }
  };

  const resetFilters = () => {
    setFilters({
      minPrice: "",
      maxPrice: "",
      category: "",
      color: "",
      bestSeller: false,
    });
  };

  return (
    <div className="min-h-screen px-4 py-8 max-w-7xl mx-auto text-white">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-white">Product List</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-300">View:</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={viewMode === "table"}
              onChange={(e) => setViewMode(e.target.checked ? "table" : "card")}
            />
            <div className="w-14 h-7 bg-gray-700 rounded-full peer peer-checked:bg-[#DA9B2B] transition-colors"></div>
            <span className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform transform peer-checked:translate-x-7"></span>
          </label>
          <span className="text-sm text-gray-300">
            {viewMode === "card" ? "Card View" : "Table View"}
          </span>
        </div>
      </div>
      {/* Filters */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
          <div className="w-[90%] h-40 bg-blue-400/10 blur-2xl rounded-full" />
        </div>
        <div className="relative z-10 bg-white/5 backdrop-blur-md p-4 rounded-xl shadow-md border border-white/10 grid grid-cols-1 md:grid-cols-6 gap-4">
          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={handleChange}
            className="p-2 border border-white/10 bg-black/30 text-white rounded text-sm placeholder-gray-400"
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={handleChange}
            className="p-2 border border-white/10 bg-black/30 text-white rounded text-sm placeholder-gray-400"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={filters.category}
            onChange={handleChange}
            className="p-2 border border-white/10 bg-black/30 text-white rounded text-sm placeholder-gray-400"
          />
          <input
            type="text"
            name="color"
            placeholder="Color"
            value={filters.color}
            onChange={handleChange}
            className="p-2 border border-white/10 bg-black/30 text-white rounded text-sm placeholder-gray-400"
          />
          <label className="flex items-center gap-2 text-sm text-white">
            <input
              type="checkbox"
              name="bestSeller"
              checked={filters.bestSeller}
              onChange={handleChange}
              className="accent-[#DA9B2B]"
            />
            Best Seller
          </label>
          <button
            onClick={resetFilters}
            className="bg-gray-700 text-white text-sm p-2 rounded hover:bg-gray-600 transition col-span-full md:col-span-1"
          >
            Reset Filters
          </button>
        </div>
      </div>
      {/* Views */}
      {products.length === 0 ? (
        <p className="text-center text-gray-300">No products found.</p>
      ) : viewMode === "card" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              fetchProducts={fetchProducts}
            />
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow border border-white/10">
          <table className="min-w-full bg-white/5 backdrop-blur text-sm text-white">
            <thead className="bg-white/10 text-gray-300 text-left border-b border-white/10">
              <tr>
                {role === "admin" && <th className="px-4 py-2">Actions</th>}
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Color</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Best Seller</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr
                  key={p._id}
                  className="border-b border-gray-700 hover:bg-[#475569]"
                >
                  <td className="px-4 py-2">
                    <img
                      src={`http://localhost:5000/uploads/${p.image}`}
                      alt={p.name}
                      className="h-12 w-12 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-2">{p.name}</td>
                  <td className="px-4 py-2">{p.category}</td>
                  <td className="px-4 py-2">{p.color}</td>
                  <td className="px-4 py-2">${p.price}</td>
                  <td className="px-4 py-2">{p.isBestSeller ? "✔️" : "—"}</td>
                  {role === "admin" && (
                    <td className="px-4 py-2">
                      <div className="flex gap-2 items-center">
                        <Link
                          to={`/products/edit/${p._id}`}
                          className="text-yellow-400 hover:text-yellow-300 text-sm font-medium"
                        >
                          ✏️
                        </Link>
                        <button
                          onClick={() => {
                            setTargetId(p._id);
                            setShowConfirm(true);
                          }}
                          className="text-red-400 hover:text-red-300 text-sm font-medium"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {/* Delete Modal */}
          {showConfirm && (
            <ConfirmDeleteModal
              message="Are you sure you want to delete this product?"
              onConfirm={() => handleTableDelete(targetId)}
              onCancel={() => {
                setShowConfirm(false);
                setTargetId(null);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
