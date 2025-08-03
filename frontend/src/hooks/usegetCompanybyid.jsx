import { setsinglecompany } from "@/Redux/companyslice";
import { setAlljobs } from "@/Redux/jobSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const usegetCompanybyid = (companyId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fatchsinglecompany = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/v2/company/get/${companyId}`,
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setsinglecompany(res.data.company));
        }
      } catch (error) {}
    };
    fatchsinglecompany();
  }, [companyId ,dispatch]);
};

export default usegetCompanybyid;
