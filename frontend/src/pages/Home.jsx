// import { Link } from "react-router-dom";

// const Home = () => {
//   return (
//     <div className="h-screen bg-gradient-to-br from-blue-500 to-indigo-800 flex items-center justify-center text-white px-4">
//       <div className="text-center max-w-md">
//         <h1 className="text-4xl font-extrabold mb-4 drop-shadow-lg">
//           Welcome to AuthFlow Dashboard🚀
//         </h1>
//         <p className="text-lg mb-6 opacity-90">
//           Securely register, verify, and manage your profile with image upload,
//           password reset, and more. Fast, simple, and beautiful.
//         </p>
//         <Link
//           to="/login"
//           className="inline-block bg-white text-indigo-700 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-gray-100 transition"
//         >
//           Login to Explore
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import patternImage from "../assets/5061807.jpg";

const Home = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleLogin = () => {
    navigate("/login", { state: { isLogin: true } });
  };

  const handleSignUp = () => {
    navigate("/login", { state: { isLogin: false } });
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* 🖼️ Pattern Background Image */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${patternImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* 🌈 Animated Background Layers */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20" />
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl animate-pulse delay-2000" />
        <div
          className="absolute w-96 h-96 bg-gradient-radial from-blue-500/5 to-transparent rounded-full pointer-events-none transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
      </div>

      {/* ✨ Foreground Content */}
      <div className="relative z-10">
        <section className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-screen text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-[#DA9B2B] to-[#FFD580] bg-clip-text text-transparent">
                AuthFlow Dashboard
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-10 leading-relaxed animate-fade-in-up delay-200">
              From sign-up to profile management, enjoy a smooth and secure
              journey — with email OTP verification, password resets, image
              uploads, and more. It’s fast, reliable, and designed to feel
              effortless.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-400">
              <button
                onClick={handleSignUp}
                className="px-8 py-3 bg-[#DA9B2B] hover:bg-[#c38a22] text-white text-lg font-semibold rounded-lg transition-transform duration-300 transform hover:scale-105 shadow-md"
              >
                Get Started
              </button>
              <button
                onClick={handleLogin}
                className="px-8 py-3 border-2 border-gray-600 hover:border-[#DA9B2B] text-gray-300 hover:text-white text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Sign In
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
