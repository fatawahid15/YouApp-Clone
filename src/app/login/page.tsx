"use client";

import React, { useState } from "react";
import { EyeIcon } from "@heroicons/react/24/outline";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Cookies from "js-cookie";
import { useNotification } from "@/components/NotificationProvider";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { notify } = useNotification();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const isEmail = emailOrUsername.includes("@");
    const requestBody = {
      email: isEmail ? emailOrUsername : "",
      username: isEmail ? "" : emailOrUsername,
      password,
    };

    try {
      const response = await fetch("https://techtest.youapp.ai/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (data.access_token) {
        notify("Login successful!", "success");

        Cookies.set("accessToken", data.access_token, {
          expires: 1, // 1 day
          secure: true,
          sameSite: "strict",
        });

        router.push("/"); // Redirect to home or desired page
      } else {
        notify(data.message || "Login failed. Please try again.", "error");
      }
    } catch (error) {
      notify("An error occurred during login. Please try again.", "error");
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

          {/* Login Form */}
          <div className="flex flex-col justify-center items-center h-full space-y-6">
            <h1 className="text-2xl font-bold text-white">Login</h1>
            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  placeholder="Enter Username/Email"
                  className="w-full bg-[#121d2a] text-white rounded-lg p-4 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-teal-500"
                />
              </div>
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
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white font-medium rounded-lg p-4 transition hover:opacity-90"
              >
                Login
              </button>
            </form>
            <p className="text-center text-sm text-gray-400">
              No account?{" "}
              <button
                type="button"
                onClick={() => router.push("/register")}
                className="text-teal-400 hover:underline"
              >
                Register here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
