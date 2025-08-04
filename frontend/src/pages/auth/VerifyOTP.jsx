import axiosInstance from "../../api/axios";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const VerifyOTP = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    if (!value) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const updatedOtp = [...otp];
        updatedOtp[index] = "";
        setOtp(updatedOtp);
      } else if (index > 0) {
        inputsRef.current[index - 1].focus();
      }
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    if (otp.some((digit) => digit === "")) {
      return toast.error("Please enter full 6-digit OTP");
    }

    const fullOtp = otp.join("");

    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/verify-otp", {
        email,
        otp: fullOtp,
      });
      toast.success(res.data.message, {
        autoClose: 1000,
        onClose: () => navigate("/login"),
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) return toast.error("Please enter your email first");
    try {
      const res = await axiosInstance.post("/auth/resend-otp", { email });
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1E1A38] via-[#2D1C4C] to-[#1E1A38] px-4">
      <form
        onSubmit={handleVerify}
        className="bg-white/5 backdrop-blur-md w-full max-w-md p-8 rounded-2xl shadow-2xl border border-white/10 space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-white">
          Verify OTP
        </h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md p-3 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DA9B2B]"
          required
        />

        <div className="flex justify-between gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputsRef.current[index] = el)}
              className="w-12 h-12 text-center rounded-lg text-lg font-bold bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DA9B2B]"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#DA9B2B] text-white py-3 rounded-md hover:bg-[#c88c27] transition font-semibold"
        >
          {loading ? "Verifying..." : "Verify & Continue"}
        </button>

        <button
          type="button"
          onClick={handleResend}
          className="w-full bg-white/10 text-white py-2 rounded-md hover:bg-white/20 text-sm transition"
        >
          Resend OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyOTP;
