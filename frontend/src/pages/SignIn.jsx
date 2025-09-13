import React, { useState } from "react";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";

const SignIn = () => {
  const primaryColor = "#f97316"; // Softer orange
  const hoverColor = "#ea580c"; // Darker orange
  const bgColor = "#fff7f2"; // Warm soft background
  const borderColor = "#e5e7eb"; // Neutral border

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const handleSignIn = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        { email, password },
        { withCredentials: true }
      );
      console.log(result);
      setErr("");
    } catch (error) {
      setErr(error.response.data.message);
    }
  };

  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const { data } = await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        {
          email: result.user.email,
        },
        { withCredentials: true }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 sm:p-6 
      bg-gradient-to-br from-orange-100 via-white to-orange-200"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="bg-white/70 backdrop-blur-xl border border-white/40 
        rounded-3xl shadow-xl w-full max-w-md p-6 sm:p-8 
        transition-all duration-500 hover:shadow-2xl hover:scale-[1.01]"
        style={{ border: `1px solid ${borderColor}` }}
      >
        {/* Logo / Title */}
        <h1
          className="text-4xl font-extrabold mb-3 text-center 
          bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent"
        >
          CampusBites
        </h1>
        <p className="text-gray-600 mb-8 text-center text-base leading-relaxed">
          Sign in to{" "}
          <span className="font-semibold text-gray-800">
            enjoy tasty food at your desk 🍕
          </span>
        </p>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2 text-sm">
            Email
          </label>
          <input
            type="text"
            className="w-full border rounded-xl px-4 py-3 bg-gray-50/60 
            focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 
            transition-all duration-300 text-sm sm:text-base"
            placeholder="Enter your email"
            style={{ border: `1px solid ${borderColor}` }}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2 text-sm">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border rounded-xl px-4 py-3 bg-gray-50/60 
              focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 
              transition-all duration-300 text-sm sm:text-base"
              placeholder="Enter your password"
              style={{ border: `1px solid ${borderColor}` }}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 
              text-gray-500 hover:text-orange-500 transition-colors"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {!showPassword ? (
                <FaRegEye size={18} />
              ) : (
                <FaEyeSlash size={18} />
              )}
            </button>
          </div>
        </div>

        {/* Forgot password */}
        <div
          className="text-right mb-4 text-orange-600 font-medium text-sm cursor-pointer 
          hover:underline"
          onClick={() => navigate("forgot-password")}
        >
          Forgot Password?
        </div>

        {/* Sign In Button */}
        <button
          className="w-full mt-2 sm:mt-3 flex items-center justify-center gap-2 
          rounded-xl px-5 py-3 font-semibold 
          shadow-lg shadow-orange-200/50 
          transition-all duration-300 text-white text-sm sm:text-base
          bg-gradient-to-r from-orange-500 to-pink-500
          hover:from-orange-600 hover:to-pink-600 hover:shadow-xl"
          onClick={handleSignIn}
        >
          Sign In
        </button>
        {err && (
          <div className="flex items-center justify-center mt-3">
            <p className="text-sm text-red-700 bg-red-100 border border-red-300 rounded-lg px-4 py-2 shadow-sm animate-shake">
              ⚠️ {err}
            </p>
          </div>
        )}

        {/* Google Sign In */}
        <button
          className="w-full flex items-center justify-center gap-3 mt-4 
          px-5 py-3 border rounded-xl cursor-pointer bg-white/80 
          text-gray-700 font-medium shadow-md 
          hover:shadow-lg hover:bg-gray-50 transition-all duration-300 
          text-sm sm:text-base"
          style={{ border: `1px solid ${borderColor}` }}
          onClick={handleGoogleAuth}
        >
          <FcGoogle size={22} />
          <span>Sign In with Google</span>
        </button>

        {/* Sign Up Link */}
        <p
          className="text-center mt-6 text-sm sm:text-base text-gray-700"
          onClick={() => navigate("/signup")}
        >
          Don`t have an account?
          <span className="text-orange-500 font-semibold hover:underline cursor-pointer">
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
