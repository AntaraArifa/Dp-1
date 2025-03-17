import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { CHAT_API_END_POINT } from "@/utils/constant";
import { setAllChats } from "@/redux/chatSlice";
import store from "@/redux/store";

const useGetAllUserChats = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllChats = async () => {
      try {
        const res = await axios.get(`${CHAT_API_END_POINT}/chat`, {
          withCredentials: true,
        });
        console.log("API Response:", res.data); 
        if (res.data.success) {
          // Check if there are chats
          if (res.data.chats && res.data.chats.length === 0) {
            console.log("No chats found");
            // You can update the state here if necessary to show the "No chats found" message.
            // For now, let's just log it.
            dispatch(setAllChats([])); // Dispatch empty array if no chats
          } else {
            console.log("Dispatching to Redux:", res.data);
            dispatch(setAllChats(res.data));
          }
        }

      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    console.log("useGetAllUserChats executed");
    fetchAllChats();
  }, [dispatch]);

};

export default useGetAllUserChats;
