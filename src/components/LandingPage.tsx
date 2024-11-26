"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    // Check for accessToken in cookies
    const token = Cookies.get("accessToken");
    setAccessToken(token || null);
  }, []);

  const handleLogout = () => {
    Cookies.remove("accessToken"); // Remove the access token
    setAccessToken(null); // Update state to reflect logout
  };

  return (
    <div className="bg-gradient-to-r from-[#1d3e43] to-[#0c1b21] flex flex-col h-screen overflow-hidden">
      <div className="flex flex-col items-center justify-center text-white p-4 pb-20">
        <div className="w-full max-w-sm h-screen bg-gradient-to-tr from-[#1d3e43] to-[#0c1b21] shadow-lg overflow-auto">
          {/* Header Section */}
          <header className="text-center py-12 space-y-4">
            <motion.h1
              className="text-3xl font-bold"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Welcome to YouApp
            </motion.h1>
            <motion.p
              className="text-gray-400 text-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Your go-to app for amazing experiences!
            </motion.p>
          </header>

          {/* Button Section */}
          <section className="px-6 py-6">
            {accessToken ? (
              <div className="space-y-4">
                {/* Profile Button */}
                <Button asChild variant="secondary" className="w-full bg-teal-500 hover:bg-teal-600 transition-all duration-300">
                  <Link href="/profile">Go to Profile</Link>
                </Button>
                {/* Logout Button */}
                <Button
                  variant="secondary"
                  className="w-full bg-red-500 hover:bg-red-600 transition-all duration-300"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Login Button */}
                <Button asChild variant="secondary" className="w-full bg-teal-500 hover:bg-teal-600 transition-all duration-300">
                  <Link href="/login">Login</Link>
                </Button>
                {/* Register Button */}
                <Button asChild variant="secondary" className="w-full bg-blue-500 hover:bg-blue-600 transition-all duration-300">
                  <Link href="/register">Register</Link>
                </Button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
