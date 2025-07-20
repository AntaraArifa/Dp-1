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
import useGetAllNotifications from "@/hooks/useGetAllNotifications";
import CreateAssessmentLink from "../admin/CreateAssessmentLink";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const { notifications, loadingStatus } = useSelector((store) => store.notification);
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
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Smart<span className="text-[#6A38C2]">Hire</span>
            </h1>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            {user ? (
              <>
                {/* Navigation Menu */}
                <div className="hidden md:flex items-center space-x-6">
                  {user.role === "Employer" ? (
                    <>
                      <Link 
                        to="/admin/companies" 
                        className="text-gray-700 hover:text-[#6A38C2] transition-colors duration-200 font-medium"
                      >
                        Companies
                      </Link>
                      <Link 
                        to="/admin/jobs" 
                        className="text-gray-700 hover:text-[#6A38C2] transition-colors duration-200 font-medium"
                      >
                        Jobs
                      </Link>
                      <Link 
                        to="/chat" 
                        className="text-gray-700 hover:text-[#6A38C2] transition-colors duration-200 font-medium"
                      >
                        Chat
                      </Link>
                      <Link 
                        to="/admin/AssessmentDashboard" 
                        className="text-gray-700 hover:text-[#6A38C2] transition-colors duration-200 font-medium"
                      >
                        Assessments
                      </Link>
                      <CreateAssessmentLink />
                    </>
                  ) : (
                    <>
                      <Link 
                        to="/" 
                        className="text-gray-700 hover:text-[#6A38C2] transition-colors duration-200 font-medium"
                      >
                        Home
                      </Link>
                      <Link 
                        to="/jobs" 
                        className="text-gray-700 hover:text-[#6A38C2] transition-colors duration-200 font-medium"
                      >
                        Jobs
                      </Link>
                      <Link 
                        to="/chat" 
                        className="text-gray-700 hover:text-[#6A38C2] transition-colors duration-200 font-medium"
                      >
                        Chat
                      </Link>
                      <Link 
                        to="/skillAssessment" 
                        className="text-gray-700 hover:text-[#6A38C2] transition-colors duration-200 font-medium"
                      >
                        Skills
                      </Link>
                      <Link 
                        to="/resume/edit" 
                        className="text-gray-700 hover:text-[#6A38C2] transition-colors duration-200 font-medium"
                      >
                        Resume
                      </Link>
                    </>
                  )}
                </div>

                {/* Notifications for Job Seekers */}
                {user.role === "Job Seeker" && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="relative p-2 text-gray-600 hover:text-[#6A38C2] transition-colors duration-200">
                        <Bell className="w-5 h-5" />
                        {unreadCount > 0 && (
                          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {unreadCount}
                          </span>
                        )}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 p-0 shadow-lg border-0 bg-white rounded-lg">
                      <div className="p-4 border-b border-gray-100">
                        <h4 className="font-semibold text-gray-900">Notifications</h4>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {Array.isArray(notifications) && notifications.length > 0 ? (
                          notifications.map((notif, index) => (
                            <div key={index} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                              <p className="font-medium text-gray-900 text-sm mb-1">
                                From: {notif.sender.fullname || "Unknown"}
                              </p>
                              <p className="text-sm text-gray-700 mb-2">{notif.message}</p>
                              
                              {notif.meetingLink && (
                                <a
                                  href={notif.meetingLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-block text-[#6A38C2] hover:text-purple-700 text-sm font-medium mb-2"
                                >
                                  Join Meeting →
                                </a>
                              )}
                              
                              {notif.interviewDateTime && (
                                <p className="text-xs text-gray-500 mb-1">
                                  Interview: {new Date(notif.interviewDateTime).toLocaleString()}
                                </p>
                              )}
                              
                              <p className="text-xs text-gray-400">
                                {new Date(notif.createdAt).toLocaleString()}
                              </p>
                            </div>
                          ))
                        ) : (
                          <div className="p-4 text-center text-gray-500">
                            No notifications
                          </div>
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>
                )}

                {/* User Profile */}
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200">
                      <Avatar className="w-8 h-8">
                        <AvatarImage
                          src={user?.profile?.profilePhoto}
                          alt="Profile"
                          className="rounded-full"
                        />
                      </Avatar>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-72 p-0 shadow-lg border-0 bg-white rounded-lg">
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage
                            src={user?.profile?.profilePhoto}
                            alt="Profile"
                            className="rounded-full"
                          />
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-gray-900">{user?.fullname}</h4>
                          <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-2">
                      {user.role === "Job Seeker" && (
                        <Link 
                          to="/profile"
                          className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                        >
                          View Profile
                        </Link>
                      )}
                      <button
                        onClick={logoutHandler}
                        className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              </>
            ) : (
              // Login/Signup buttons for non-authenticated users
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button 
                    variant="outline" 
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-[#6A38C2] hover:bg-purple-700 text-white">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;