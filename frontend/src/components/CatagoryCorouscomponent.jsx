import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/Redux/jobSlice"; // ✅ Make sure you import this

const catagory = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Scientist",
  "UI/UX Designer",
  "Graphic Designer",
  "DevOps Engineer",
  "Mobile App Developer",
  "Product Manager",
  "QA Engineer",
  "Machine Learning Engineer",
  "Cybersecurity Analyst",
  "Blockchain Developer",
  "Cloud Architect",
  "Game Developer",
  "Technical Writer",
];

const CatagoryCorouscomponent = () => {
  const dispatch = useDispatch();          
  const navigate = useNavigate();      

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {catagory.map((cat, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg-basis-1/3">
              <Button
                variant="outline"
                className="cursor-pointer rounded-full"
                onClick={() => searchJobHandler(cat)}  
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="cursor-pointer" />
        <CarouselNext className="cursor-pointer" />
      </Carousel>
    </div>
  );
};

export default CatagoryCorouscomponent;
