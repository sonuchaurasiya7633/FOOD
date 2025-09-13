import React, { useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { serverUrl } from '../App'

const ForgotPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }
    try {
      const result = await axios.post(`${serverUrl}/api/auth/send-otp`, { email }, { withCredentials: true });
      console.log(result);
      setStep(2);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to send OTP.");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      alert("Please enter the OTP.");
      return;
    }
    try {
      const result = await axios.post(`${serverUrl}/api/auth/verify-otp`, { email, otp }, { withCredentials: true });
      console.log(result);
      setStep(3);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "OTP verification failed.");
    }
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      alert("Please fill in both password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    try {
      const result = await axios.post(`${serverUrl}/api/auth/reset-password`, { email, newPassword }, { withCredentials: true });
      console.log(result);
      navigate("/signin");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Password reset failed.");
    }
  };

  return (
    <div className="flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <div className="flex items-center gap-4 mb-4 ">
          <IoArrowBackOutline size={30} className="text-[#ff4d2d] cursor-pointer" onClick={() => navigate("/signin")} />
          <h1 className="text-2xl font-bold text-center text-[#ff4d2d]">
            Forgot Password
          </h1>
        </div>

        {step === 1 &&
          <div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2 text-sm">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full border rounded-xl px-4 py-3 bg-gray-50/60 
                focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 
                transition-all duration-300 text-sm sm:text-base"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <button
              className="w-full mt-3 sm:mt-4 flex items-center justify-center gap-2 
                rounded-xl px-5 py-3 font-semibold shadow-lg shadow-orange-200/50 
                transition-all duration-300 text-white text-sm sm:text-base
                bg-gradient-to-r from-orange-500 to-pink-500
                hover:from-orange-600 hover:to-pink-600 hover:shadow-xl cursor-pointer"
              onClick={handleSendOtp}
            >
              Send OTP
            </button>
          </div>
        }

        {step === 2 &&
          <div>
            <div className="mb-6">
              <label htmlFor="otp" className="block text-gray-700 font-medium mb-2 text-sm">
                OTP
              </label>
              <input
                id="otp"
                type="text"
                className="w-full border rounded-xl px-4 py-3 bg-gray-50/60 
                focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 
                transition-all duration-300 text-sm sm:text-base"
                placeholder="Enter OTP"
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
              />
            </div>
            <button
              className="w-full mt-3 sm:mt-4 flex items-center justify-center gap-2 
                rounded-xl px-5 py-3 font-semibold shadow-lg shadow-orange-200/50 
                transition-all duration-300 text-white text-sm sm:text-base
                bg-gradient-to-r from-orange-500 to-pink-500
                hover:from-orange-600 hover:to-pink-600 hover:shadow-xl cursor-pointer"
              onClick={handleVerifyOtp}
            >
              Verify
            </button>
          </div>
        }

        {step === 3 &&
          <div>
            <div className="mb-6">
              <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-2 text-sm">
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                className="w-full border rounded-xl px-4 py-3 bg-gray-50/60 
                focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 
                transition-all duration-300 text-sm sm:text-base"
                placeholder="Enter New Password"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2 text-sm">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="w-full border rounded-xl px-4 py-3 bg-gray-50/60 
                focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 
                transition-all duration-300 text-sm sm:text-base"
                placeholder="Enter Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>
            <button
              className="w-full mt-3 sm:mt-4 flex items-center justify-center gap-2 
                rounded-xl px-5 py-3 font-semibold shadow-lg shadow-orange-200/50 
                transition-all duration-300 text-white text-sm sm:text-base
                bg-gradient-to-r from-orange-500 to-pink-500
                hover:from-orange-600 hover:to-pink-600 hover:shadow-xl cursor-pointer"
              onClick={handleResetPassword}
            >
              Reset Password
            </button>
          </div>
        }

      </div>
    </div>
  );
};

export default ForgotPassword;