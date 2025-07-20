import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-400 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center justify-center mb-8">
          <span className="px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium text-sm">
            No. 1 Job Hunt Website
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
          Search, Apply &<br />
          Get Your <span className="text-[#6A38C2]">Dream Jobs</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          Discover thousands of job opportunities from top companies. 
          Your perfect career match is just one search away.
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex items-center bg-white shadow-lg border border-gray-200 rounded-full p-2 transition-all duration-300 hover:shadow-xl focus-within:shadow-xl focus-within:border-[#6A38C2]">
            <input
              type="text"
              placeholder="Find your dream jobs..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-6 py-3 text-lg bg-transparent border-none outline-none placeholder-gray-500"
            />
            <Button 
              onClick={handleSearch}
              className="bg-[#6A38C2] hover:bg-purple-700 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105"
            >
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
          </div>
        </div>

        {/* Simple Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#6A38C2] mb-1">10K+</div>
            <div className="text-sm text-gray-600">Active Jobs</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#6A38C2] mb-1">5K+</div>
            <div className="text-sm text-gray-600">Companies</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#6A38C2] mb-1">50K+</div>
            <div className="text-sm text-gray-600">Success Stories</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;