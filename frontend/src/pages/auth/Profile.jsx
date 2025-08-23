import { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";

const Profile = () => {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  // const token = localStorage.getItem("token");

  //   axiosInstance
  //     .get("/auth/profile")
  //     .then((res) => {
  //       console.log("PROFILE DATA:", res.data);
  //       setUser(res.data);
  //     })
  //     .catch((err) => {
  //       console.error("Profile load failed:", err);
  //     });
  // }, []);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log("Access token in frontend:", token); // log it here

    if (!token) return;

    axiosInstance
      .get("/auth/profile")
      .then((res) => {
        console.log("PROFILE DATA:", res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.error("Profile load failed:", err);
      });
  }, []);

if (!user)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1E1A38] via-[#2D1C4C] to-[#1E1A38]">
      <h2 className="text-xl font-semibold text-white">Loading profile...</h2>
    </div>
  );

return (
  <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#1E1A38] via-[#2D1C4C] to-[#1E1A38]">
    <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-xs flex flex-col items-center space-y-6 border border-white/10">
      {/* Profile Image */}
      {user.profileImage && (
        <img
          src={user.profileImage}
          alt="Profile"
          className="w-36 h-36 rounded-full object-cover border-4 border-[#DA9B2B] shadow-md"
        />
      )}

      {/* Name */}
      <h1 className="text-2xl font-extrabold text-white">{user.name}</h1>

      {/* Details */}
      <div className="text-center text-gray-300 text-sm space-y-2">
        <p>
          <span className="font-semibold text-white">Email:</span> <br />
          {user.email}
        </p>
        <p>
          <span className="font-semibold text-white">Phone:</span> <br />
          {user.phone || "N/A"}
        </p>
      </div>

      {/* Optional Footer Strip */}
      <div className="mt-4 w-full h-1 bg-gradient-to-r from-[#DA9B2B] to-purple-500 rounded-full" />
    </div>
  </div>
);

};

export default Profile;
