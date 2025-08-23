import { useState } from "react";
import axiosInstance from "../../api/axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import registerImage from "../../assets/login.jpg";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    profileImage: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "profileImage") {
      const file = e.target.files[0];
      setForm({ ...form, profileImage: file });
      if (file) {
        const imageURL = URL.createObjectURL(file);
        setPreview(imageURL);
      }
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      await axiosInstance.post("/auth/register", data);
      toast.success("Registration successful. Check your email for OTP", {
        autoClose: 1000,
        onClose: () => navigate("/verify-otp"),
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="relative min-h-screen px-4 py-8 flex items-center justify-center overflow-hidden">
      {/* Glow effect */}
      <div
        className="absolute w-[500px] h-[500px] bg-purple-400/20 blur-3xl rounded-full -z-10 shadow-xl shadow-purple-500/30"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Card */}
      <div className="relative z-10 flex flex-col md:flex-row w-full max-w-3xl bg-white/5 backdrop-blur-md rounded-xl shadow-xl overflow-hidden border border-white/10 lg:h-[550px]">
        {/* Image Section */}
        <div className="w-full md:w-1/2 h-48 md:h-auto lg:h-full">
          <img
            src={registerImage}
            alt="Register visual"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-6">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
              className="w-full rounded-md p-3 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DA9B2B]"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full rounded-md p-3 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DA9B2B]"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              onChange={handleChange}
              required
              className="w-full rounded-md p-3 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DA9B2B]"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                className="w-full rounded-md p-3 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DA9B2B]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-300"
                tabIndex={-1}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Profile Image
              </label>
              <input
                type="file"
                name="profileImage"
                accept="image/*"
                onChange={handleChange}
                className="w-full text-white file:bg-[#DA9B2B] file:text-white file:border-none file:rounded-md file:px-3 file:py-1 file:cursor-pointer bg-white/10 p-2 rounded-md"
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-3 w-24 h-24 object-cover rounded-full mx-auto"
                />
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#DA9B2B] text-white py-3 rounded-md hover:bg-[#c88c27] transition duration-200 font-semibold"
            >
              Register
            </button>

            <div className="text-center text-sm text-gray-200">
              Already have an account?{" "}
              <Link to="/login" className="text-[#DA9B2B] hover:underline">
                Login here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
