import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarausel from "./CategoryCarausel";
import LatestJobs from "./LatestJobs";
import Footer from "./shared/Footer";

import useGetAllJobs from "@/hooks/useGetAllJobs";

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "Employer") {
      navigate("/admin/companies");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />
      <HeroSection />
      <div className="space-y-16 py-16">
        <CategoryCarausel />
        <LatestJobs />
      </div>
      <Footer />
    </div>
  );
};

export default Home;