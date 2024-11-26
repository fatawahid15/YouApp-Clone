"use client";
import { PencilIcon } from "@heroicons/react/24/outline";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

interface Profile {
  horoscope: string;
  username: string;
  email: string;
  name: string;
  birthday: string;
  height: number;
  weight: number;
  zodiac: string;
  profileImage?: string;
}

interface AboutCardProps {
  profile: Profile;
  updateProfile: (updatedData: Partial<Profile>) => Promise<void>;
}

export default function AboutCard({ profile, updateProfile }: AboutCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editableProfile, setEditableProfile] = useState<Profile>(profile);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  useEffect(() => {
    setEditableProfile(profile);
  }, [profile]);

  const handleSave = async () => {
    setIsEditing(false);

    // Update profile with the uploaded image if exists
    if (uploadedImage) {
      const formData = new FormData();
      formData.append("file", uploadedImage);

      const accessToken = Cookies.get("accessToken");

      if (!accessToken) return;

      // Simulating API request for uploading the image
      const response = await fetch("https://techtest.youapp.ai/api/updateProfile", {
        method: "POST",
        body: formData,
        headers: {
            "x-access-token": accessToken,
          },
      });

      if (response.ok) {
        const data = await response.json();
        const profileImageUrl = data.url; // Assuming API returns the uploaded image URL
        editableProfile.profileImage = profileImageUrl;
      }
    }

    await updateProfile(editableProfile); // Update the profile via API
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(file);

      // Display the image locally before saving
      const reader = new FileReader();
      reader.onload = () => {
        setEditableProfile({
          ...editableProfile,
          profileImage: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-[#1a2634] rounded-lg p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-white font-semibold">About</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-teal-500"
        >
          <PencilIcon className="h-5 w-5" />
        </button>
      </div>

      {isEditing ? (
        <form className="space-y-4">
          {/* Image Upload Section */}
          <div className="space-y-2">
            <label className="text-gray-400">Profile Image</label>
            {editableProfile.profileImage && (
              <img
                src={editableProfile.profileImage}
                alt="Profile Preview"
                className="w-32 h-32 object-cover rounded-full mx-auto"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-teal-500 file:text-white hover:file:bg-teal-600"
            />
          </div>

          {/* Editable Fields */}
          <input
            type="text"
            value={editableProfile.name}
            onChange={(e) =>
              setEditableProfile({ ...editableProfile, name: e.target.value })
            }
            className="w-full bg-[#1a2634] text-white rounded-md p-3 outline-none border border-gray-500 focus:ring focus:ring-teal-500"
          />
          <input
            type="date"
            value={editableProfile.birthday}
            onChange={(e) =>
              setEditableProfile({
                ...editableProfile,
                birthday: e.target.value,
              })
            }
            className="w-full bg-[#1a2634] text-white rounded-md p-3 outline-none border border-gray-500 focus:ring focus:ring-teal-500"
          />
          <input
            type="number"
            value={editableProfile.height}
            onChange={(e) =>
              setEditableProfile({
                ...editableProfile,
                height: parseInt(e.target.value),
              })
            }
            className="w-full bg-[#1a2634] text-white rounded-md p-3 outline-none border border-gray-500 focus:ring focus:ring-teal-500"
          />
          <input
            type="number"
            value={editableProfile.weight}
            onChange={(e) =>
              setEditableProfile({
                ...editableProfile,
                weight: parseInt(e.target.value),
              })
            }
            className="w-full bg-[#1a2634] text-white rounded-md p-3 outline-none border border-gray-500 focus:ring focus:ring-teal-500"
          />
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="w-full py-3 px-4 rounded-md bg-gray-700 text-white hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="w-full py-3 px-4 rounded-md bg-teal-500 text-white hover:bg-teal-600"
            >
              Save & Update
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4 text-sm">
          {profile.profileImage && (
            <img
              src={profile.profileImage}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full mx-auto"
            />
          )}
          <p className="text-gray-400">
            Name: <span className="text-white">{editableProfile.name}</span>
          </p>
          <p className="text-gray-400">
            Birthday:{" "}
            <span className="text-white">{editableProfile.birthday}</span>
          </p>
          <p className="text-gray-400">
            Height:{" "}
            <span className="text-white">{editableProfile.height} cm</span>
          </p>
          <p className="text-gray-400">
            Weight:{" "}
            <span className="text-white">{editableProfile.weight} kg</span>
          </p>
        </div>
      )}
    </div>
  );
}
