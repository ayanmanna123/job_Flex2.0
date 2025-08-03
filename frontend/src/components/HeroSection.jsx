import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/Redux/jobSlice";

function HeroSection() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    if (!query.trim()) return;
    console.log(query)
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10 ">
        <span className="mx-auto  px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium">
          No. 1 Job Hunt Website
        </span>
        <h1 className="text-5xl font-bold">
          Search, Apply & <br /> Get Your{" "}
          <span className="text-[#6A38C2]">Dream job</span>
        </h1>
        <p>
          Lorem ipsum dolor, sit amet cons . Dolor excepturi laudantium non
          assumenda corrupti!
        </p>
        <div className="flex w-[50%]  shadow-lg border border-gray-200 pl-3 rounded-full items-center mx-auto gap-4 ">
          <input
            type="text"
            placeholder="find your jobs"
            className="outline-none border-none w-full h-6 "
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            onClick={searchJobHandler}
            className={"rounded-r-full bg-[#6A38C2]"}
          >
            <Search className="h-5 w-5 " />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
