import React from "react";
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const {user}=useSelector(store=>store.auth);
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
          <ul className="flex font-medium items-center gap-8">
            <li className="hover:text-[#F83002] cursor-pointer"><Link to="/">Home</Link></li>
            <li className="hover:text-[#F83002] cursor-pointer"><Link to="/jobs">Jobs</Link></li>
            <li className="hover:text-[#F83002] cursor-pointer"><Link to="/browse">Browse</Link></li>
          </ul>

          {user ? (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer ml-4 w-10 h-10 rounded-full">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                    className="rounded-full"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4 shadow-lg rounded-lg bg-white">
                <div className="flex gap-4 items-center">
                  <Avatar className="w-12 h-12 rounded-full">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                      className="rounded-full"
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user?.fullname}</h4>
                    <p className="text-sm text-gray-500">Frontend Developer</p>
                  </div>
                </div>
                <div className="flex flex-col text-gray-600 mt-4">
                  <div className="flex w-fit items-center gap-2 cursor-pointer mt-2">
                    <button className="text-gray-600 hover:text-blue-600">
                      <Link to="/profile">View Profile</Link>
                      
                    </button>
                  </div>
                  <div className="flex w-fit items-center gap-2 cursor-pointer mt-2">
                    <button className="text-gray-600 hover:text-red-600">
                      Logout
                    </button>
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
