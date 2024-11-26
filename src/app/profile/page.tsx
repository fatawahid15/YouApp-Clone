"use client"
import React, { useEffect, useState } from "react";
import AboutCard from "@/components/AboutCard";
import InterestCard from "@/components/InterestCard";
import Cookies from "js-cookie";
import { getZodiacEmoji, getHoroscopeEmoji } from "@/utils/astrology";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    horoscope: "",
    username: "",
    email: "",
    name: "",
    birthday: "",
    height: 0,
    weight: 0,
    zodiac: "",
    interests: [] as string[],
  });

  const fetchProfile = async () => {
    const accessToken = Cookies.get("accessToken");

    if (!accessToken) return;

    const response = await fetch("https://techtest.youapp.ai/api/getProfile", {
      method: "GET",
      headers: {
        "x-access-token": accessToken,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setProfile(data.data);
    } else {
      console.error("Failed to fetch profile:", response.statusText);
    }
  };

  const updateProfile = async (updatedData: Partial<typeof profile>) => {
    const accessToken = Cookies.get("accessToken");

    if (!accessToken) return;

    const response = await fetch("https://techtest.youapp.ai/api/updateProfile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": accessToken,
      },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      const data = await response.json();
      setProfile((prev) => ({ ...prev, ...updatedData }));
      console.log("Profile updated successfully:", data);
    } else {
      console.error("Failed to update profile:", response.statusText);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!profile.name) return <div className="flex items-center justify-center min-h-screen text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#0d1621] flex justify-center">
      <main className="w-full max-w-sm space-y-6 p-6">
        {/* Profile Cover */}
        <div className="relative bg-gray-700 rounded-lg h-48 flex items-end p-4 overflow-hidden">
          <img
            src="profile/image"
            alt="Profile Cover"
            className="absolute inset-0 w-full h-full object-cover rounded-lg opacity-40"
          />
          <div className="relative z-10 text-white space-y-2">
            <h1 className="text-lg font-bold">@{profile.username}</h1>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{getZodiacEmoji(profile.zodiac)}</span>
              <h2 className="text-md font-medium">{profile.zodiac}</h2>
            </div>
            {profile.horoscope && (
              <div className="flex items-center gap-2">
                <span className="text-2xl">{getHoroscopeEmoji(profile.horoscope)}</span>
                <p className="text-sm text-gray-200">{profile.horoscope}</p>
              </div>
            )}
          </div>
        </div>

        {/* About Card */}
        <AboutCard profile={profile} updateProfile={updateProfile} />

        {/* Interests Card */}
        <InterestCard interests={profile.interests} updateProfile={updateProfile} />
      </main>
    </div>
  );
}