import { setMessages } from '@/redux/messageSlice';
import {  CHAT_API_END_POINT} from '@/utils/constant';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const useGetAllChatMessages = (selectedChat) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedChat?._id) return;
    
      try {
        setLoading(true);
        const response = await axios.get(`${CHAT_API_END_POINT}/${selectedChat._id}`, {
          withCredentials: true,
        });
        setMessages(response.data|| []);
        console.log("Fetched messages:", response.data);  
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [selectedChat]); 

  return { messages, loading, error };
};
export default useGetAllChatMessages;