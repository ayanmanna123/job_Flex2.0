import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompanyTable from "./CompanyTable";
import { useNavigate } from "react-router-dom";
import usegetAllCompanies from "@/hooks/usegetAllCompanies";
import { useDispatch, useSelector } from "react-redux";
import { setsearchcompanyBytext } from "@/Redux/companyslice";

const Companies = () => {
  usegetAllCompanies();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState("");  
  useEffect(() => {
    dispatch(setsearchcompanyBytext(input));  
  }, [input, dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl gap-4 mx-auto my-10 pl-6">
        <div className="flex items-center justify-between my-5">
          <Input
            className={"w-fit"}
            placeholder="filter by name"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <Button onClick={() => navigate("/admine/company/creat")}>
            New Company
          </Button>
        </div>
        <CompanyTable />
      </div>
    </div>
  );
};

export default Companies;
