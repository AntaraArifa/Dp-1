import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, Bell } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";
import { setNotifications, setLoadingStatus } from "@/redux/notificationSlice"; // Import actions
import useGetAllNotifications from "@/hooks/useGetAllNotifications"; // Import the custom hook

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const { notifications, loadingStatus } = useSelector((store) => store.notification); // Get notifications and loadingStatus from Redux store
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  // Function to logout
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error logging out");
    }
  };

  const makeLinksClickable = (text) => {
    return text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" class="text-blue-500 underline" target="_blank">$1</a>');
  };

  // Use the custom hook to fetch notifications
  useGetAllNotifications();

  // Update unread notifications count
  useEffect(() => {
    const unread = notifications.filter((n) => !n.read).length;
    setUnreadCount(unread);
  }, [notifications]);

  return (
    <div className="bg-white shadow-md w-full">
      <div className="flex items-center justify-between px-4 h-16 max-w-full">
        {/* Left side - SmartHire */}
        <div>
          <h1 className="text-2xl font-bold">
            Smart<span className="text-[#F83002]">Hire</span>
          </h1>
        </div>

        {/* Right side - Navigation links */}
        <div className="flex items-center gap-8">
          {user ? (
            <>
              {/* Show these links only when the user is logged in */}
              {user.role === "Employer" ? (
                <ul className="no-bullets">
                  <li className="hover:text-[#F83002] cursor-pointer">
                    <Link to="/admin/companies">Companies</Link>
                  </li>
                  <li className="hover:text-[#F83002] cursor-pointer">
                    <Link to="/admin/jobs">Jobs</Link>
                  </li>
                  <li className="hover:text-[#F83002] cursor-pointer">
                    <Link to="/chat">Chat</Link>
                  </li>
                </ul>
              ) : (
                <ul className="no-bullets flex gap-8">
                  <li className="hover:text-[#F83002] cursor-pointer">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="hover:text-[#F83002] cursor-pointer">
                    <Link to="/jobs">Jobs</Link>
                  </li>
                  <li className="hover:text-[#F83002] cursor-pointer">
                    <Link to="/chat">Chat</Link>
                  </li>
                  <li className="hover:text-[#F83002] cursor-pointer">
                    <Link to="/skillAssessment">Skill Assessment</Link>
                  </li>
                  <li className="hover:text-[#F83002] cursor-pointer">
                    <Link to="/resume/edit">Resume</Link>
                  </li>

                  {/* Notification Bell for Job Seekers */}
                  {user.role === "Job Seeker" && (
                    <li>
                      <div className="relative">
                        {/* Notification Bell */}
                        <Popover>
                          <PopoverTrigger>
                            <div className="relative cursor-pointer">
                              <Bell className="text-blue-600 w-6 h-6" />
                              {unreadCount > 0 && (
                                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                                  {unreadCount}
                                </span>
                              )}
                            </div>
                          </PopoverTrigger>
                          <PopoverContent className="w-80 p-4 shadow-lg rounded-lg bg-white">
                            <h4 className="font-medium mb-2">Notifications</h4>
                            {Array.isArray(notifications) && notifications.length > 0 ? (
                              notifications.map((notif, index) => (
                                <div key={index} className="border-b py-2">
                                  {/* Sender's Full Name */}
                                  <p className="font-semibold text-gray-700">
                                    From: {notif.sender.fullname || "Unknown"}
                                  </p>

                                  {/* Interview Message */}
                                  <p className="text-sm">{notif.message}</p>

                                  {/* Meeting Link */}
                                  {notif.meetingLink && (
                                    <a
                                      href={notif.meetingLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 underline block mt-1"
                                    >
                                      Join Meeting
                                    </a>
                                  )}

                                  {/* Interview Date & Time */}
                                  {notif.interviewDateTime && (
                                    <p className="text-xs text-gray-500">
                                      Interview on: {new Date(notif.interviewDateTime).toLocaleString()}
                                    </p>
                                  )}

                                  {/* Timestamp */}
                                  <p className="text-xs text-gray-400">
                                    {new Date(notif.createdAt).toLocaleString()}
                                  </p>
                                </div>
                              ))
                            ) : (
                              <p className="text-gray-500">No notifications</p>
                            )}
                          </PopoverContent>
                        </Popover>
                      </div>
                    </li>
                  )}
                </ul>
              )}

              {/* User Profile & Logout */}
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer ml-4 w-10 h-10 rounded-full">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="Profile"
                      className="rounded-full"
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4 shadow-lg rounded-lg bg-white">
                  <div className="flex gap-4 items-center">
                    <Avatar className="w-12 h-12 rounded-full">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="Profile"
                        className="rounded-full"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
                    </div>
                  </div>
                  <div className="flex flex-col text-gray-600 mt-4">
                    {user.role === "Job Seeker" && (
                      <div className="flex w-fit items-center gap-2 cursor-pointer mt-2">
                        <button className="text-gray-600 hover:text-blue-600">
                          <Link to="/profile">View Profile</Link>
                        </button>
                      </div>
                    )}
                    <div className="flex w-fit items-center gap-2 cursor-pointer mt-2">
                      <LogOut />
                      <Button onClick={logoutHandler} variant="link">
                        Logout
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            // Show these options only when the user is logged out
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
