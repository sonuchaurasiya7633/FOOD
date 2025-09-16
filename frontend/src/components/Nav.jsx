import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";

const Nav = () => {
  const { userData, city } = useSelector((state) => state.user);
  const [showInfo, setShowInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useDispatch();

  const handlelogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/signout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="w-full h-[70px] flex items-center justify-between px-4 md:px-10 fixed top-0 z-[9999] 
      bg-gradient-to-r from-[#fff5f2] via-[#fff9f6] to-[#fff5f2] backdrop-blur-lg shadow-lg transition-all duration-300"
    >
      {/* Logo */}
      <img
        src="./public/logo5.png"
        alt="CampusBites Logo"
        className="
    h-25 md:h-25 lg:h-30 w-auto 
    object-contain 
    drop-shadow-lg 
    transition-transform duration-300 ease-in-out 
    hover:scale-105 hover:drop-shadow-xl
  "
      />

      {/* Search Bar (Desktop) */}
      <div className="hidden md:flex items-center w-[55%] lg:w-[40%] h-[50px] bg-white/80 rounded-full shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition">
        <div className="flex items-center gap-2 px-4 border-r border-gray-200">
          <FaLocationDot className="w-[22px] h-[22px] text-[#ff4d2d]" />
          <div className="truncate text-gray-700 font-medium">
            {city || "Choose Location"}
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 w-full">
          <IoSearch size={22} className="text-[#ff4d2d]" />
          <input
            type="text"
            placeholder="Search delicious food..."
            className="w-full text-gray-700 placeholder-gray-400 bg-transparent outline-none"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5">
        {/* Mobile Search Icon */}
        {showSearch ? (
          <RxCross2
            className="text-[#ff4d2d] text-2xl md:hidden cursor-pointer hover:scale-110 transition"
            onClick={() => setShowSearch(false)}
          />
        ) : (
          <IoSearch
            size={24}
            className="text-[#ff4d2d] md:hidden cursor-pointer hover:scale-110 transition"
            onClick={() => setShowSearch(true)}
          />
        )}

        {/* Cart */}
        <div className="relative cursor-pointer hover:scale-110 transition transform">
          <FiShoppingCart size={24} className="text-[#ff4d2d]" />
          <span className="absolute right-[-8px] top-[-10px] bg-[#ff4d2d] text-white text-xs rounded-full px-[6px] py-[1px] shadow-md animate-bounce">
            0
          </span>
        </div>

        {/* Orders Button */}
        <button
          className="hidden md:block px-5 py-1.5 rounded-full bg-gradient-to-r from-[#ff4d2d] to-[#ff784d] text-white 
          text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105 transition"
        >
          My Orders
        </button>

        {/* User Profile Circle */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-[#ff4d2d] to-[#ff784d] 
          text-white text-lg shadow-md font-bold cursor-pointer capitalize hover:scale-110 transition"
          onClick={() => setShowInfo((prev) => !prev)}
        >
          {userData?.fullName.slice(0, 1)}
        </div>

        {/* Dropdown Menu */}
        {showInfo && (
          <div
            className="fixed top-[75px] right-4 md:right-10 lg:right-[12%] w-[220px] bg-white/90 backdrop-blur-lg border border-gray-100 
            shadow-2xl rounded-xl p-4 flex flex-col gap-3 z-[9999] animate-fadeIn"
          >
            <div className="text-[16px] font-semibold capitalize text-gray-700 border-b border-gray-200 pb-2">
              {userData.fullName}
            </div>
            <div className="md:hidden text-[#ff4d2d] font-semibold cursor-pointer hover:underline">
              My Orders
            </div>
            <div
              className="text-[#ff4d2d] font-semibold cursor-pointer hover:underline"
              onClick={handlelogOut}
            >
              Log Out
            </div>
          </div>
        )}
      </div>

      {/* Mobile Search Box */}
      {showSearch && (
        <div
          className="absolute top-[70px] left-0 w-full px-4 py-3 bg-white/95 backdrop-blur-lg border-t border-gray-200 
          shadow-md flex items-center gap-3 md:hidden animate-slideDown"
        >
          <FaLocationDot className="w-[22px] h-[22px] text-[#ff4d2d]" />
          <div className="truncate text-gray-700 font-medium">
            {city || "Choose Location"}
          </div>
          <IoSearch size={22} className="text-[#ff4d2d]" />
          <input
            type="text"
            placeholder="Search delicious food..."
            className="w-full text-gray-700 placeholder-gray-400 bg-transparent outline-none"
          />
        </div>
      )}
    </div>
  );
};

export default Nav;
