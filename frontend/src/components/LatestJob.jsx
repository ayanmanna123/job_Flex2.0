import React from "react";
import LatestJobCard from "./LatestJobCard";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const LatestJob = () => {
  const jobState = useSelector((store) => store.job);
  const alljobs = jobState?.alljobs || [];

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold ">
        Latest & Top <span className="text-[#6A38C2]">Job Openings</span>
      </h1>

      <div className="grid grid-cols-3 gap-4 my-5">
        {alljobs.length === 0 ? (
          <span>No jobs found</span>
        ) : (
          alljobs.slice(0, 6).map((job, index) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <LatestJobCard job={job} />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default LatestJob;
