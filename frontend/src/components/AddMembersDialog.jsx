import React, { useState } from "react";
import axios from "axios";
import { CHAT_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

const AddMembersDialog = ({ open, setOpen, chatId, onMemberAdded }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddMember = async () => {
    if (!email) {
      setError("Email is required.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

     
      const { data: resolvedUsers } = await axios.post(
        `${CHAT_API_END_POINT}/resolve-emails`,
        { emails: [email] },
        {
          withCredentials: true, 
        }
      );

      if (!resolvedUsers || resolvedUsers.length === 0) {
        setError("User not found.");
        setLoading(false);
        return;
      }

      const userId = resolvedUsers[0]._id; 

     
      const { data } = await axios.put(
        `${CHAT_API_END_POINT}/groupadd`,
        { chatId, userId },
        {
          withCredentials: true,
        }
      );

      console.log("Member added:", data);
      toast.success("Member added successfully!");
      setOpen(false); 
    } catch (err) {
      console.error("Error adding member:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to add member.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="absolute inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Add Members</h2>
        <input
          type="text"
          placeholder="Enter user email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded border mb-4"
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button
          onClick={handleAddMember}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Member"}
        </button>
        <button
          onClick={() => setOpen(false)}
          className="ml-2 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          disabled={loading}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddMembersDialog;
