import React, { useEffect } from "react";
import Navbar from "./shared/Navbar.jsx";
import HeroSection from "./HeroSection.jsx";
import CatagoryCorouscomponent from "./CatagoryCorouscomponent.jsx";
import LatestJob from "./LatestJob.jsx";
import Footer from "./shared/Footer.jsx";
import usegetAllJobs from "@/hooks/usegetAllJobs.jsx";
import { useSelector } from "react-redux";
import { store } from "@/Redux/store.js";
import { useNavigate } from "react-router-dom";

const Home = () => {
  usegetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const naviget = useNavigate();
  useEffect(() => {
    if (user?.role === "requiter") {
      naviget("/admin/compnaies");
    }
  }, []);
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CatagoryCorouscomponent />
      <LatestJob />
      <Footer />
    </div>
  );
};

export default Home;
