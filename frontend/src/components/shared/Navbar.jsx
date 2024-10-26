import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"; // Adjusted import for Popover
import { Avatar, AvatarImage } from "../ui/avatar"; // Adjusted import for Avatar
import { Button } from "../ui/button"; // Adjusted import for Button
import { LogOut, User2 } from "lucide-react"; // Icons from lucide-react

const Navbar = () => {
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
        <div className="flex items-center">
          <ul className="flex font-medium items-center gap-8">
            <li className="hover:text-[#F83002] cursor-pointer">Home</li>
            <li className="hover:text-[#F83002] cursor-pointer">Jobs</li>
            <li className="hover:text-[#F83002] cursor-pointer">Browse</li>
          </ul>

          {/* Popover for user avatar */}
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
            <PopoverContent className="w-72 p-4 shadow-lg rounded-lg bg-white">
              <div className="flex gap-4 items-center">
                <Avatar className="w-12 h-12 rounded-full">
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                    className="rounded-full"
                  />
                </Avatar>
                <div>
                  <h4 className="font-medium">Niaz Rahman</h4>
                  <p className="text-sm text-gray-500">Frontend Developer</p>
                </div>
              </div>
              {/* Additional Content (Profile Links) */}
              <div className="flex flex-col text-gray-600 mt-4">
                <div className="flex w-fit items-center gap-2 cursor-pointer">
                  <button className="text-gray-600 hover:text-blue-600">
                    View Profile
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
        </div>
      </div>
    </div>
  );
};

export default Navbar;
