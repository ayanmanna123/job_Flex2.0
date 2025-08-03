import React from "react";
import { Button } from "./ui/button";
import { Badge } from "@/components/ui/badge";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";

const Jobs = ({job}) => {
  const id="dfjdskflkdnv"
  const dayAgofunction = (mongodbTime) =>{
    const createdAt= new Date(mongodbTime)
    const currenttime = new Date();
    const timedif = currenttime - createdAt
    return Math.floor(timedif / (1000*24*60*60))
  }
  const navigat=useNavigate();
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border-gray-300">
      <div className="flex items-center justify-between"></div>
      <p className="text-sm text-gray-600 ">{dayAgofunction(job?.createdAt) === 0 ? "Today":`${dayAgofunction(job?.createdAt)} days ago`} </p>
      <Button variant="outline" className="rounded-full" size="icon">
        <Bookmark />
      </Button>
      <div className="flex my-2 items-center gap-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar className="w-10 h-10">
            <AvatarImage
              src={job?.company?.logo}
              alt="Logo"
            />
            <AvatarFallback>CL</AvatarFallback>
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg"> {job?.alljobs?.company?.name}</h1>
          <p className="text-sm text-shadow-gray-500">India</p>
        </div>
      </div>
      <div className="">
        <h1 className="font-black tsxt-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">
          {job?.description}
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge variant={"ghost"} className={"text-[#F83002]  font-bold"}>
          {job?.position} position
        </Badge>
        <Badge variant={"ghost"} className={"text-[#7209b7] font-bold"}>
           {job?.jobType}
        </Badge>
        <Badge variant={"ghost"} className={"text-blue-700  font-bold"}>
           {job?.salary}
        </Badge>
      </div>
      <div className=" flex items-center gap-4 mt-4">
        <Button variant={'outline'} onClick={()=>navigat(`/discription/${job?._id}`)} > Details </Button>
        <Button className={'bg-[#7209b7]'}>save for later</Button>
      </div>
    </div>
  );
};

export default Jobs;
