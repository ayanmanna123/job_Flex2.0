import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setsinglecompany } from "@/Redux/companyslice";
const CompantCreat = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState();
  const dispatch = useDispatch();
  const regesterNewcompany = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v2/company/regestercompany",
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",  
          },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        dispatch(setsinglecompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admine/company/${companyId}`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Try again!");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your Company Name</h1>
          <p className="text-gray-500 "></p>
        </div>
        what would you like to give your comapny name you can chnage latter
        <Label>Company Name</Label>
        <Input
          type="text"
          className={"my-2"}
          placeholder="Jobhunt ,Microsoft etc"
          onChange={(e) => setCompanyName(e.target.value)}
        ></Input>
        <div className="my-10 flex items-center gap-2">
          <Button
            variant={"outline"}
            onClick={() => navigate("/admin/compnaies")}
          >
            cancel
          </Button>
          <Button onClick={regesterNewcompany}>continue</Button>
        </div>
      </div>
    </div>
  );
};

export default CompantCreat;
