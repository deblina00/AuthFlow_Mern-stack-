// import { useState, useEffect } from "react";
// import axiosInstance from "../../api/axios";
// import { toast } from "react-toastify";
// import { useNavigate, Link } from "react-router-dom";
// import useAuthStore from "../../store/authStore";
// import loginImage from "../../assets/login-img.jpg";

// const Login = () => {
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const { setToken } = useAuthStore();
//   const [showTokens, setShowTokens] = useState(false);
//   const [tokens, setTokens] = useState({ accessToken: "", refreshToken: "" });
//   const navigate = useNavigate();

//   useEffect(() => {
//     const savedEmail = localStorage.getItem("rememberEmail");
//     const savedPassword = localStorage.getItem("rememberPassword");
//     if (savedEmail && savedPassword) {
//       setForm({ email: savedEmail, password: savedPassword });
//       setRememberMe(true);
//     }
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axiosInstance.post("/auth/login", form);
//       // const { token, role } = res.data;
//       const { accessToken, refreshToken, role } = res.data;

//       if (rememberMe) {
//         localStorage.setItem("rememberEmail", form.email);
//         localStorage.setItem("rememberPassword", form.password);
//       } else {
//         localStorage.removeItem("rememberEmail");
//         localStorage.removeItem("rememberPassword");
//       }

//       // Store in your auth store
//       setToken({ token: accessToken, role: res.data.role });

//       // OPTIONAL: store refresh token securely if needed
//       localStorage.setItem("refreshToken", refreshToken); // ⚠️ only for demo/dev

//       // ✅ Show tokens (for testing/demo purposes)
//       toast.success("Login successful!", {
//         autoClose: 1000,
//         onClose: () => {
//           console.log("Access Token:", accessToken);
//           console.log("Refresh Token:", refreshToken);

//           setTokens({ accessToken, refreshToken });
//           setShowTokens(true);
//           navigate("/products"); // or delay this if you want to show tokens briefly
//         },
//       });
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Login failed");
//     }

//     // setToken({ token: res.data.token, role: res.data.role });
//     //   toast.success("Login successful, Welcome!", {
//     //     autoClose: 1000,
//     //     onClose: () => navigate("/products"),
//     //   });
//     // } catch (err) {
//     //   toast.error(err.response?.data?.message || "Login failed");
//     // }
//   };

//  return (
//    <div className="relative min-h-screen bg-gradient-to-br from-[#1e3a8a] via-[#0f172a] to-[#2e1065] flex items-center justify-center overflow-hidden">
//      <div className="flex w-full max-w-4xl h-[550px] bg-white rounded-2xl shadow-lg overflow-hidden">
//        {/* Left side image */}
//        <div className="w-full md:w-1/2 hidden md:block">
//          <img
//            src={loginImage}
//            alt="Login visual"
//            className="h-full w-full object-cover rounded-l-2xl"
//          />
//        </div>

//        {/* Right side login form */}
//        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
//          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
//            Login
//          </h2>

//          <form onSubmit={handleSubmit} className="space-y-4">
//            <input
//              type="email"
//              name="email"
//              placeholder="Email"
//              value={form.email}
//              onChange={(e) => setForm({ ...form, email: e.target.value })}
//              className="w-full border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
//            />

//            <div className="relative">
//              <input
//                type={showPassword ? "text" : "password"}
//                name="password"
//                placeholder="Password"
//                value={form.password}
//                onChange={(e) => setForm({ ...form, password: e.target.value })}
//                className="w-full border rounded-md p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
//              />
//              <button
//                type="button"
//                onClick={() => setShowPassword(!showPassword)}
//                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
//                tabIndex={-1}
//              >
//                {showPassword ? "🙈" : "👁️"}
//              </button>
//            </div>

//            <label className="flex items-center space-x-2 text-sm text-gray-700">
//              <input
//                type="checkbox"
//                checked={rememberMe}
//                onChange={(e) => setRememberMe(e.target.checked)}
//              />
//              <span>Remember Me</span>
//            </label>

//            <div className="text-right">
//              <Link
//                to="/forgot-password"
//                className="text-sm text-blue-600 hover:underline"
//              >
//                Forgot Password?
//              </Link>
//            </div>

//            <button
//              type="submit"
//              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-200"
//            >
//              Login
//            </button>

//            <div className="text-center text-sm text-gray-600">
//              New here?{" "}
//              <Link to="/register" className="text-blue-600 hover:underline">
//                Create an account
//              </Link>
//            </div>
//          </form>

//          {/* ✅ Collapsible Token Panel */}
//          {tokens.accessToken && (
//            <div className="mt-6 p-4 border border-gray-300 rounded bg-gray-50">
//              <div className="flex justify-between items-center">
//                <h4 className="text-sm font-semibold text-gray-700">
//                  Tokens (dev/debug only)
//                </h4>
//                <button
//                  onClick={() => setShowTokens((prev) => !prev)}
//                  className="text-blue-500 underline text-sm"
//                >
//                  {showTokens ? "Hide" : "Show"}
//                </button>
//              </div>

//              {showTokens && (
//                <div className="mt-3 text-xs text-gray-800 space-y-2 break-all">
//                  <div>
//                    <strong>Access Token:</strong>
//                    <p className="whitespace-pre-wrap">{tokens.accessToken}</p>
//                  </div>
//                  <div>
//                    <strong>Refresh Token:</strong>
//                    <p className="whitespace-pre-wrap">{tokens.refreshToken}</p>
//                  </div>
//                </div>
//              )}
//            </div>
//          )}
//        </div>
//      </div>
//    </div>
//  );

// };

// export default Login;

import { useState, useEffect } from "react";
import axiosInstance from "../../api/axios";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import loginImage from "../../assets/login.jpg";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { setToken } = useAuthStore();
  const [showTokens, setShowTokens] = useState(false);
  const [tokens, setTokens] = useState({ accessToken: "", refreshToken: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberEmail");
    const savedPassword = localStorage.getItem("rememberPassword");
    if (savedEmail && savedPassword) {
      setForm({ email: savedEmail, password: savedPassword });
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/login", form);
      const { accessToken, refreshToken, role } = res.data;

      if (rememberMe) {
        localStorage.setItem("rememberEmail", form.email);
        localStorage.setItem("rememberPassword", form.password);
      } else {
        localStorage.removeItem("rememberEmail");
        localStorage.removeItem("rememberPassword");
      }

      setToken({ token: accessToken, role });
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      toast.success("Login successful!", {
        autoClose: 1000,
        onClose: () => {
          setTokens({ accessToken, refreshToken });
          setShowTokens(true);
          navigate("/products");
        },
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="relative min-h-screen px-4 py-8 flex items-center justify-center overflow-hidden">
      {/* Glow Effect */}
      <div
        className="absolute w-[500px] h-[500px] bg-purple-400/20 blur-3xl rounded-full -z-10 shadow-xl shadow-purple-500/30"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Login Card */}
      <div className="relative z-10 flex flex-col md:flex-row w-full max-w-3xl bg-white/5 backdrop-blur-md rounded-xl shadow-xl overflow-hidden border border-white/10 lg:h-[550px]">
        {/* Image Section */}
        <div className="w-full md:w-1/2 h-48 md:h-auto lg:h-full">
          <img
            src={loginImage}
            alt="Login visual"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-6">
            Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-md p-3 bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#DA9B2B]"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
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

            <label className="flex items-center space-x-2 text-sm text-gray-200">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-[#DA9B2B]"
              />
              <span>Remember Me</span>
            </label>

            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-[#DA9B2B] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-[#DA9B2B] text-white py-3 rounded-md hover:bg-[#c88c27] transition duration-200 font-semibold"
            >
              Login
            </button>

            <div className="text-center text-sm text-gray-200">
              New here?{" "}
              <Link to="/register" className="text-[#DA9B2B] hover:underline">
                Create an account
              </Link>
            </div>
          </form>

          {tokens.accessToken && (
            <div className="mt-6 p-4 border border-gray-300 rounded bg-gray-50 text-xs text-gray-800">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-sm">Tokens (dev/debug)</h4>
                <button
                  onClick={() => setShowTokens((prev) => !prev)}
                  className="text-[#DA9B2B] underline text-sm"
                >
                  {showTokens ? "Hide" : "Show"}
                </button>
              </div>

              {showTokens && (
                <div className="space-y-2 break-words">
                  <div>
                    <strong>Access Token:</strong>
                    <p className="whitespace-pre-wrap">{tokens.accessToken}</p>
                  </div>
                  <div>
                    <strong>Refresh Token:</strong>
                    <p className="whitespace-pre-wrap">{tokens.refreshToken}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
