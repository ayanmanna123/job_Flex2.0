import React from "react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
const LatestJobCard = ({ job }) => {
  const naviget = useNavigate();
  return (
    <div
      className="p-5 rounded-md shadow-xl bg-white border-gray-100 cursor-pointer "
      onClick={() => naviget(`/discription/${job?._id}`)}
    >
      <div>
        <Button className="p-6" variant="outline" size="icon">
          <Avatar className="w-10 h-10">
            <AvatarImage src={job?.company?.logo} alt="Logo" />
            <AvatarFallback>CL</AvatarFallback>
          </Avatar>
        </Button>
      </div>
      <div>
        <h1 className="font-medium text-lg ">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2 ">{job?.title}</h1>
        <p className="text-sm text-gray-600 ">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge variant={"ghost"} className={"text-[#F83002]  font-bold"}>
          {" "}
          {job?.position} position
        </Badge>
        <Badge variant={"ghost"} className={"text-[#7209b7] font-bold"}>
          {job?.jobType}
        </Badge>
        <Badge variant={"ghost"} className={"text-blue-700  font-bold"}>
          {" "}
          {job?.salary}
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCard;
