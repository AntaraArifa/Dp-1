import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setNotifications } from "@/redux/notificationSlice";
import { NOTIFICATION_API_END_POINT } from "@/utils/constant";

const POLLING_INTERVAL = 5000; // 5 seconds

const useGetAllNotifications = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let intervalId;

    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${NOTIFICATION_API_END_POINT}/get`, {
          withCredentials: true,
        });

        console.log("Fetched notifications:", response.data);

        if (Array.isArray(response.data.notifications)) {
          dispatch(setNotifications(response.data.notifications));
        } else {
          console.error("Unexpected API response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    // Fetch immediately, then start polling
    fetchNotifications();
    intervalId = setInterval(fetchNotifications, POLLING_INTERVAL);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [dispatch]);

  return null;
};

export default useGetAllNotifications;
