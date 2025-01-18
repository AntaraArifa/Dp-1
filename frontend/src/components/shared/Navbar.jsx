import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

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
          {user && user.role === "Employer" ? (
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
                <Link to="/resume/edit">Resume</Link>
              </li>
            </ul>
          )}

          {user ? (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer ml-4 w-10 h-10 rounded-full">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                    className="rounded-full"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4 shadow-lg rounded-lg bg-white">
                <div className="flex gap-4 items-center">
                  <Avatar className="w-12 h-12 rounded-full">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                      className="rounded-full"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-gray-500">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col text-gray-600 mt-4">
                  {user && user.role === "Job Seeker" && (
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
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">
                  Signup
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
