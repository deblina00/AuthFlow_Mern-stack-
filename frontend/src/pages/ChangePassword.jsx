import { useState } from "react";
import axiosInstance from "../api/axios";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";

const ChangePassword = () => {
  const [form, setForm] = useState({
    email: "",
    currentPassword: "",
    newPassword: "",
  });

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put("/auth/change-password", form);
      toast.success("Password updated successfully");
      setForm({ email: "", currentPassword: "", newPassword: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white/5 backdrop-blur-md p-5 rounded-xl shadow-lg border border-white/10 space-y-4"
      >
        <h1 className="text-xl font-semibold text-center text-white">
          Change Password
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full rounded-md py-2 px-3 text-sm bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DA9B2B]"
          value={form.email}
          onChange={handleChange}
          required
        />

        <div className="relative">
          <input
            type={showCurrent ? "text" : "password"}
            name="currentPassword"
            placeholder="Current Password"
            className="w-full rounded-md py-2 px-3 pr-10 text-sm bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DA9B2B]"
            value={form.currentPassword}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={() => setShowCurrent(!showCurrent)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-white/60"
            tabIndex={-1}
          >
            {showCurrent ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>

        <div className="relative">
          <input
            type={showNew ? "text" : "password"}
            name="newPassword"
            placeholder="New Password"
            className="w-full rounded-md py-2 px-3 pr-10 text-sm bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DA9B2B]"
            value={form.newPassword}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={() => setShowNew(!showNew)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-white/60"
            tabIndex={-1}
          >
            {showNew ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-[#DA9B2B] hover:bg-[#c88c27] text-white py-2 text-sm rounded-md transition"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
