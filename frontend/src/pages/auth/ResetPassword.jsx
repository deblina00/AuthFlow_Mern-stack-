// import { useLocation, useNavigate } from "react-router-dom";
// import { useState, useRef } from "react";
// import { toast } from "react-toastify";
// import axiosInstance from "../../api/axios";

// const ResetPassword = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [otp, setOtp] = useState(new Array(6).fill(""));
//   const inputsRef = useRef([]);
//   const { state } = useLocation(); // get email from forgot-password page
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     email: state?.email || "",
//     // otp: "",
//     newPassword: "",
//   });

//   // const handleChange = (e) => {
//   //   setForm({ ...form, [e.target.name]: e.target.value });
//   // };


//    const handleOtpChange = (e, index) => {
//      const value = e.target.value.replace(/\D/, "");
//      if (!value) return;

//      const updatedOtp = [...otp];
//      updatedOtp[index] = value;
//      setOtp(updatedOtp);

//      if (index < 5) {
//        inputsRef.current[index + 1]?.focus();
//      }
//    };

//    const handleOtpKeyDown = (e, index) => {
//      if (e.key === "Backspace") {
//        if (otp[index]) {
//          const updatedOtp = [...otp];
//          updatedOtp[index] = "";
//          setOtp(updatedOtp);
//        } else if (index > 0) {
//          inputsRef.current[index - 1]?.focus();
//        }
//      }
//    };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//      if (otp.some((digit) => digit === "")) {
//        return toast.error("Please enter the full 6-digit OTP");
//      }

//     try {
//       await axiosInstance.post("/auth/reset-password", {
//         email: form.email,
//         otp: otp.join(""),
//         newPassword: form.newPassword,
//       });
//       toast.success("Password reset successfully. Please login.", {
//         autoClose: 1000,
//         onClose: () => navigate("/login"),
//       });
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Reset failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md space-y-5"
//       >
//         <h2 className="text-2xl font-bold text-center text-gray-800">
//           Reset Password
//         </h2>

//         <p className="text-sm text-gray-600 text-center">
//           Enter the 6-digit OTP sent to your email and choose a new password.
//         </p>

//         {/* OTP Input Boxes */}

//         <div className="flex justify-between gap-2">
//           {otp.map((digit, index) => (
//             <input
//               key={index}
//               type="text"
//               maxLength={1}
//               inputMode="numeric"
//               value={digit}
//               onChange={(e) => handleOtpChange(e, index)}
//               onKeyDown={(e) => handleOtpKeyDown(e, index)}
//               ref={(el) => (inputsRef.current[index] = el)}
//               className="w-12 h-12 text-center border border-gray-300 rounded-md text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           ))}
//         </div>

//         {/* Password Input */}
//         <div className="relative">
//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             placeholder="Password"
//             value={form.newPassword}
//             onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
//             className="input w-full border rounded-md p-2 pr-10"
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
//             tabIndex={-1}
//           >
//             {showPassword ? "🙈" : "👁️"}
//           </button>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
//         >
//           Reset Password
//         </button>

//         <div className="text-center">
//           <button
//             type="button"
//             onClick={() => navigate("/login")}
//             className="text-sm text-blue-600 hover:underline"
//           >
//             Back to Login
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ResetPassword;


import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axios";

const ResetPassword = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.password || !form.confirmPassword) {
      return toast.error("Please fill in all fields");
    }
    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      await axiosInstance.post(`/auth/reset-password/${id}/${token}`, {
        password: form.password,
        confirmPassword: form.confirmPassword,
      });


      toast.success("Password reset successful", {
        autoClose: 1000,
        onClose: () => navigate("/login"),
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed");
    }
  };

return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1E1A38] via-[#2D1C4C] to-[#1E1A38] px-4">
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-2xl space-y-5 border border-white/10"
    >
      <h2 className="text-3xl font-bold text-center text-white">
        Reset Your Password
      </h2>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="New Password"
          value={form.password}
          onChange={handleChange}
          className="w-full rounded-md p-3 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DA9B2B]"
          required
        />
      </div>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm New Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full rounded-md p-3 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DA9B2B]"
          required
        />
      </div>

      <label className="flex items-center space-x-2 text-gray-300 text-sm">
        <input
          type="checkbox"
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
          className="accent-[#DA9B2B]"
        />
        <span>Show Passwords</span>
      </label>

      <button
        type="submit"
        className="w-full bg-[#DA9B2B] text-white py-3 rounded-md hover:bg-[#c88c27] transition font-semibold"
      >
        Reset Password
      </button>
    </form>
  </div>
);

};

export default ResetPassword;
