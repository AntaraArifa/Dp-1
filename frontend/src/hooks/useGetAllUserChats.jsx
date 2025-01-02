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
          console.log("Dispatching to Redux:", res.data);
          dispatch(setAllChats(res.data));
        }
        

      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };
    console.log("useGetAllUserChats executed");

    fetchAllChats();
  }, []);

  
};

export default useGetAllUserChats;
