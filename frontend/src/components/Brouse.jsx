import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Jobs from "./Jobs";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/Redux/jobSlice";
import usegetAllJobs from "@/hooks/usegetAllJobs";

const Brouse = () => {
  usegetAllJobs();
  const { alljobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold mb-4">Search result - ({alljobs.length})</h1>

        {alljobs.length === 0 ? (
          <p className="text-gray-500 text-lg">No job found</p>
        ) : (
          <div className="grid gap-4 grid-cols-3">
            {alljobs.map((job) => (
              <Jobs job={job} key={job._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Brouse;
