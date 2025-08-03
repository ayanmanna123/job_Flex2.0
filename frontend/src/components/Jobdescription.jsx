import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setsinglejob } from "@/Redux/jobSlice";
import { toast } from "sonner";

const Jobdescription = () => {
  const  params = useParams();
  const jobid = params.id;
  const dispatch = useDispatch();

  const { singlejob } = useSelector((state) => state.job);
  const {user} =useSelector((state)=> state.auth)
  const  inisilize = singlejob?.applications?.some(application=>application.application === user?._id) || false
  const [isApplied , setIsapplied] = useState(inisilize)

   const applyJobHandler = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/v4/application/apply/${jobid}`, {withCredentials:true});
            console.log(res.data);
            if(res.data.success){
               
              
                 setIsapplied(true); // Update the local state
                const updatedSingleJob = {...singlejob, applications:[...singlejob.applications,{applicant:user?._id}]}
                dispatch(setsinglejob(updatedSingleJob)); // helps us to real time UI update
                toast.success(res.data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/v3/job/get/${jobid}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setsinglejob(res.data.job));
         setIsapplied(res.data.job.applications.some(application => application.applicant === user?._id));

        }
      } catch (error) {
        console.error("Job fetch error:", error);
      }
    };
    fetchSingleJob();
  }, [jobid, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl ">{singlejob?.title}</h1>
          <div className="flex items-center gap-2 my-2">
            <Badge className="text-blue-700 font-bold" variant="ghost">
             {singlejob?.position}
            </Badge>
            <Badge className="text-[#F83002] font-bold" variant="ghost">
              {singlejob?.jobType}
            </Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost">
              {singlejob?.salary}  
            </Badge>
          </div>
        </div>
        <Button
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#5f32ad]"
          }`}
          onClick= { isApplied ? null : applyJobHandler}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>

      <div className="my-4">
        <h1 className="border-b-2 pb-1 border-b-gray-300 font-medium">
          {singlejob?.description}
        </h1>
      </div>

      <div>
        <h1 className="font-bold my-1">
          Role:
          <span className="pl-4 font-normal text-gray-800">
            {singlejob?.title}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Location:
          <span className="pl-4 font-normal text-gray-800">
            {singlejob?.location}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Description:
          <span className="pl-4 font-normal text-gray-800">
            {singlejob?.description}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Experience:
          <span className="pl-4 font-normal text-gray-800">
            {singlejob?.experiencelavel}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Salary:
          <span className="pl-4 font-normal text-gray-800">
            {singlejob?.salary} LPA
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Total Applicants:
          <span className="pl-4 font-normal text-gray-800">
            {singlejob?.applications?.length || 0}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Posted Date:
          <span className="pl-4 font-normal text-gray-800">
            {new Date(singlejob?.createdAt).toLocaleDateString()}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default Jobdescription;
