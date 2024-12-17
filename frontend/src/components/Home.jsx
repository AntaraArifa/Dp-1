import  { useEffect } from 'react'
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarausel from "./CategoryCarausel";
import LatestJobs from "./LatestJobs";
import Footer from "./shared/Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === 'Employer') {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <div>
      <Navbar />
      <HeroSection/>
      <CategoryCarausel/>
      <LatestJobs/>
      <Footer/>
    </div>
  );
};

export default Home;
