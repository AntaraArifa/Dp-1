import React, { useState } from "react";
import axios from "axios";
import { NOTIFICATION_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

const InterviewInviteDialog = ({ open, setOpen, applicantId }) => {
  const [message, setMessage] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [meetingLink,setMeetingLink]=useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSendInvitation = async () => {
    if (!message ||!meetingLink|| !dateTime) {
      setError("Message and Interview Time are required.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data } = await axios.post(
        `${NOTIFICATION_API_END_POINT}/send`,
        {
          recipient: applicantId,
          message,
          meetingLink,
          interviewTime: dateTime,
        },
        {
          withCredentials: true,
        }
      );

      toast.success("Interview invitation sent!");
      setOpen(false);
    } catch (err) {
      console.error("Error sending invitation:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to send invitation.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="absolute inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Invite for Interview</h2>
        <textarea
          placeholder="Enter invitation message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 rounded border mb-4"
        />
        <input
          type="String"
          value={meetingLink}
          onChange={(e) => setMeetingLink(e.target.value)}
          className="w-full p-2 rounded border mb-4"
        />
        <input
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          className="w-full p-2 rounded border mb-4"
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <button
          onClick={handleSendInvitation}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Invitation"}
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

export default InterviewInviteDialog;
