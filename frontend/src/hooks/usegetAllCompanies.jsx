import { setcompanies } from "@/Redux/companyslice";
 
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const  usegetAllCompanies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fatchacompanies = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v2/company/getcompanis",
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setcompanies(res.data.companys));
        }
      } catch (error) {}
    };
    fatchacompanies();
  }, [dispatch]);
};

export default usegetAllCompanies;
