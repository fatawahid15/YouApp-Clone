"use client";

import { PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface InterestCardProps {
  interests: string[];
  updateProfile: (updatedData: Partial<{ interests: string[] }>) => Promise<void>;
}

export default function InterestCard({ interests, updateProfile }: InterestCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editableInterests, setEditableInterests] = useState(interests);
  const [newInterest, setNewInterest] = useState("");

  const addInterest = () => {
    if (newInterest.trim()) {
      setEditableInterests([...editableInterests, newInterest.trim()]);
      setNewInterest("");
    }
  };

  const removeInterest = (index: number) => {
    setEditableInterests(editableInterests.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setIsEditing(false);
    await updateProfile({ interests: editableInterests }); // Update interests via API
  };

  return (
    <div className="bg-[#1a2634] rounded-lg p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-white font-semibold">Interests</h2>
        <button onClick={() => setIsEditing(!isEditing)} className="text-teal-500">
          <PencilIcon className="h-5 w-5" />
        </button>
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <h3 className="text-white font-semibold">What interests you?</h3>
          <div className="flex flex-wrap gap-2">
            {editableInterests.map((interest, index) => (
              <div
                key={index}
                className="bg-gray-700 text-white px-3 py-1 rounded-full flex items-center gap-2"
              >
                {interest}
                <button onClick={() => removeInterest(index)}>
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              placeholder="Add interest"
              className="flex-1 bg-[#0d1621] text-white rounded-md p-2"
            />
            <button
              onClick={addInterest}
              className="py-3 px-4 bg-teal-500 text-white rounded-md hover:bg-teal-600"
            >
              Add
            </button>
          </div>
          <button
            onClick={handleSave}
            className="py-3 px-4 bg-teal-500 text-white rounded-md hover:bg-teal-600"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {editableInterests.map((interest, index) => (
            <span
              key={index}
              className="bg-gray-700 text-white px-3 py-1 rounded-full"
            >
              {interest}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
