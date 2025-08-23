// import { useState } from "react";
// import axiosInstance from "../../api/axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axiosInstance.post("/auth/forgot-password", { email });
//       toast.success("OTP sent to your email", {
//         autoClose: 1000,
//         onClose: () => navigate("/reset-password", { state: { email } }),
//       });
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to send OTP");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-md bg-white p-6 rounded-2xl shadow-md space-y-5"
//       >
//         <h2 className="text-2xl font-bold text-center text-gray-800">
//           Forgot Password
//         </h2>

//         <p className="text-sm text-gray-600 text-center">
//           Enter your email and we'll send you an OTP to reset your password.
//         </p>

//         <input
//           type="email"
//           placeholder="Enter your email"
//           className="w-full border rounded-md p-2"
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
//         >
//           Send OTP
//         </button>

//         <div className="text-center">
//           <button
//             type="button"
//             onClick={() => navigate("/login")}
//             className="text-sm text-blue-600 hover:underline mt-2"
//           >
//             Back to Login
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ForgotPassword;


import { useState } from "react";
import axiosInstance from "../../api/axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/auth/forgot-password", { email });
      toast.success("Password reset link sent to your email");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send reset link");
    }
  };

 return (
   <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1E1A38] via-[#2D1C4C] to-[#1E1A38] px-4">
     <form
       onSubmit={handleSubmit}
       className="w-full max-w-md bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-2xl space-y-5 border border-white/10"
     >
       <h2 className="text-3xl font-bold text-center text-white">
         Forgot Password
       </h2>
       <p className="text-sm text-gray-300 text-center">
         Enter your email and we’ll send you a link to reset your password.
       </p>
       <input
         type="email"
         placeholder="Enter your email"
         className="w-full rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#DA9B2B] bg-white/10 text-white placeholder-gray-400"
         onChange={(e) => setEmail(e.target.value)}
         required
       />
       <button
         type="submit"
         className="w-full bg-[#DA9B2B] text-white py-3 rounded-md hover:bg-[#c88c27] transition duration-200 font-semibold"
       >
         Send Reset Link
       </button>
     </form>
   </div>
 );

};

export default ForgotPassword;
