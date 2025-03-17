import React, { useCallback, useState } from "react";
import axios from "axios";
import { NOTIFICATION_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const CreateMeetingDialog = ({ open, setOpen, applicantId }) => {
    const navigate=useNavigate();
  const [value, setValue] = useState();
  const handleJoinRoom = useCallback (() => {
      navigate(`/meeting/${value}`);
  },[navigate,value]
)

  return (
    <div className="absolute inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Create Meeting</h2>
        <input
          type="text"
          placeholder="Enter meeting code"
          className="w-full border p-2 rounded mb-4"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          />
        <button onClick={handleJoinRoom}>
         Join room
        </button>
      </div>
    </div>
  );
};

export default CreateMeetingDialog;
