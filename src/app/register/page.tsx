"use client";

import React, { useState } from "react";
import { EyeIcon } from "@heroicons/react/24/outline";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useNotification } from "@/components/NotificationProvider";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();
  const { notify } = useNotification();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      notify("Passwords do not match. Please try again.", "error");
      return;
    }

    const requestBody = { email, username, password };

    try {
      const response = await fetch("https://techtest.youapp.ai/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (data.message !== "User already exists" && response.status === 201) {
        notify("Registration successful! Redirecting to login...", "success");
        router.push("/");
      } else {
        notify(data.message || "Registration failed. Please try again.", "error");
      }
    } catch (error) {
      notify("An error occurred during registration. Please try again.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1d3e43] to-[#0c1b21] flex items-center justify-center">
      <div className="w-full max-w-sm h-screen shadow-lg overflow-hidden">
        <div className="relative flex flex-col h-full p-6 bg-gradient-to-tr from-[#1d3e43] to-[#0c1b21]">
          {/* Back Button */}
          <button
            onClick={() => router.push("/")}
            className="absolute top-4 left-4 text-white flex items-center space-x-2 focus:outline-none"
          >
            <ArrowLeftIcon className="h-5 w-5" />
            <span className="text-sm font-medium">Back</span>
          </button>

          {/* Register Form */}
          <div className="flex flex-col justify-center items-center h-full space-y-6">
            <h1 className="text-2xl font-bold text-white">Register</h1>
            <form onSubmit={handleRegister} className="w-full space-y-4">
              {/* Email Field */}
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                  className="w-full bg-[#121d2a] text-white rounded-lg p-4 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-teal-500"
                />
              </div>
              {/* Username Field */}
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter Username"
                  className="w-full bg-[#121d2a] text-white rounded-lg p-4 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-teal-500"
                />
              </div>
              {/* Password Field */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  className="w-full bg-[#121d2a] text-white rounded-lg p-4 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-teal-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <EyeIcon className="h-6 w-6" />
                </button>
              </div>
              {/* Confirm Password Field */}
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full bg-[#121d2a] text-white rounded-lg p-4 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-teal-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <EyeIcon className="h-6 w-6" />
                </button>
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white font-medium rounded-lg p-4 transition hover:opacity-90"
              >
                Register
              </button>
            </form>
            <p className="text-center text-sm text-gray-400">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="text-teal-400 hover:underline"
              >
                Login here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
